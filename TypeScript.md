---
title: "Vitest에서 쓰이는 TypeScript 패턴 학습 가이드"
type: docs
status: active
date: 2026-03-17
---

# Vitest에서 쓰이는 TypeScript 패턴 완전 정복

> Vitest 코드를 읽다가 타입 선언에서 멈추는 순간들을 없애자.
> 각 패턴마다 **쉬운 설명 → Vitest 실제 코드 → 직접 만들어보기** 순서로 학습한다.

---

## 패턴 1: Generic — 타입을 변수처럼 쓰기

### 쉬운 설명

함수가 "어떤 타입이든" 받을 수 있으면서도, 입력과 출력의 타입 관계를 유지하는 방법.

```typescript
// 제네릭 없이 — 타입 정보가 사라짐
function first(arr: any[]): any {
  return arr[0]
}
const x = first([1, 2, 3])  // x: any 😢

// 제네릭 — 타입이 유지됨
function first<T>(arr: T[]): T {
  return arr[0]
}
const x = first([1, 2, 3])  // x: number 😊
const y = first(['a', 'b'])  // y: string 😊
```

`<T>`는 "여기에 타입이 들어올 거야"라는 자리표시자. 호출할 때 TypeScript가 자동으로 추론해줌.

### 제약 조건 (extends)

```typescript
// T는 아무거나 다 되는 게 아니라, "함수"여야 한다고 제한
function callIt<T extends (...args: any[]) => any>(fn: T): ReturnType<T> {
  return fn()
}

callIt(() => 42)     // OK — 함수니까
callIt("hello")      // Error — 문자열은 함수가 아님
```

### Vitest에서 어떻게 쓰여?

**withTimeout — 함수 타입을 그대로 보존** — `packages/runner/src/context.ts:40`

```typescript
export function withTimeout<T extends (...args: any[]) => any>(
  fn: T,        // 원래 함수
  timeout: number,
): T {          // 반환 타입도 T — 원래 함수와 같은 타입!
  return (function runWithTimeout(...args) {
    // ...
  }) as T
}
```

왜 제네릭을 쓰냐면:

```typescript
// 제네릭 없이 하면
function withTimeout(fn: Function, timeout: number): Function { ... }

const original = (name: string, age: number) => `${name}: ${age}`
const wrapped = withTimeout(original, 5000)
wrapped('kim', 25)  // Error! Function 타입이라 인자 타입을 모름

// 제네릭 있으면
const wrapped = withTimeout(original, 5000)
wrapped('kim', 25)  // OK! 원래 함수 시그니처 유지됨
```

### 직접 만들어보기

```typescript
// 과제 1: 배열의 마지막 요소를 반환하는 제네릭 함수
function last<T>(arr: T[]): T | undefined {
  // TODO
}

last([1, 2, 3])     // number | undefined
last(['a', 'b'])    // string | undefined

// 과제 2: 두 객체를 병합하는 제네릭 함수
function merge<A extends object, B extends object>(a: A, b: B): A & B {
  // TODO
}

const result = merge({ name: 'kim' }, { age: 25 })
result.name  // string (타입 추론!)
result.age   // number (타입 추론!)
```

---

## 패턴 2: 타입 가드 (Type Guard) — 런타임 체크로 타입 좁히기

### 쉬운 설명

`unknown`이나 유니온 타입을 안전하게 좁히는 방법. `is` 키워드가 핵심.

```typescript
// 일반 함수 — TypeScript가 타입을 못 좁힘
function isString(x: unknown): boolean {
  return typeof x === 'string'
}

if (isString(value)) {
  value.toUpperCase()  // Error! value는 여전히 unknown
}

// 타입 가드 — is 키워드로 타입 좁히기
function isString(x: unknown): x is string {
  return typeof x === 'string'
}

if (isString(value)) {
  value.toUpperCase()  // OK! value가 string으로 좁혀짐
}
```

### Vitest에서 어떻게 쓰여?

**1. Mock 함수 확인** — `packages/spy/src/index.ts:17`

```typescript
export function isMockFunction(fn: any): fn is Mock {
  return (
    typeof fn === 'function'
    && '_isMockFunction' in fn
    && fn._isMockFunction === true
  )
}

// 사용처:
if (isMockFunction(something)) {
  something.mockReset()  // Mock 타입의 메서드 접근 가능!
}
```

**2. 객체 리터럴 확인** — `packages/expect/src/jest-utils.ts:392`

```typescript
function isObjectLiteral(source: unknown): source is Record<string, unknown> {
  return source != null && typeof source === 'object' && !Array.isArray(source)
}
```

**3. `in` 연산자로 타입 좁히기** — Vitest 전반에서 사용

```typescript
// 네 PR #9861에서도 이 패턴 썼지!
if (FIXTURE_STACK_TRACE_KEY in fn) {
  // 여기서 fn[FIXTURE_STACK_TRACE_KEY]에 접근 가능
}
```

### 직접 만들어보기

```typescript
// 과제: API 응답을 안전하게 처리하는 타입 가드
interface SuccessResponse {
  status: 'ok'
  data: unknown
}
interface ErrorResponse {
  status: 'error'
  message: string
}
type ApiResponse = SuccessResponse | ErrorResponse

function isSuccess(res: ApiResponse): res is SuccessResponse {
  // TODO
}

function isError(res: ApiResponse): res is ErrorResponse {
  // TODO
}

// 사용:
const res: ApiResponse = await fetchApi()
if (isSuccess(res)) {
  console.log(res.data)     // SuccessResponse로 좁혀짐
} else {
  console.log(res.message)  // ErrorResponse로 좁혀짐
}
```

---

## 패턴 3: 판별 유니온 (Discriminated Union) — 타입별 분기 처리

### 쉬운 설명

유니온 타입에 **공통 필드**(보통 `type` or `kind`)를 넣어서 TypeScript가 자동으로 좁히게 하는 패턴.

```typescript
// type 필드가 "판별자" 역할
interface Cat { type: 'cat'; meow: () => void }
interface Dog { type: 'dog'; bark: () => void }

type Animal = Cat | Dog

function handle(animal: Animal) {
  if (animal.type === 'cat') {
    animal.meow()  // TypeScript가 Cat으로 좁힘!
  } else {
    animal.bark()  // Dog로 좁힘!
  }
}
```

### Vitest에서 어떻게 쓰여?

**Mock 결과 타입** — `packages/spy/src/types.ts:1`

```typescript
export interface MockResultReturn<T> {
  type: 'return'
  value: T
}
export interface MockResultIncomplete {
  type: 'incomplete'
  value: undefined
}
export interface MockResultThrow {
  type: 'throw'
  value: any
}

export type MockResult<T> =
  | MockResultReturn<T>
  | MockResultThrow
  | MockResultIncomplete
```

사용할 때:

```typescript
function handleResult<T>(result: MockResult<T>) {
  switch (result.type) {
    case 'return':
      console.log(result.value)  // T 타입 — 성공 값
      break
    case 'throw':
      console.error(result.value)  // any — 에러
      break
    case 'incomplete':
      console.log('아직 안 끝남')  // value는 undefined
      break
  }
}
```

`switch` + `type` 필드만으로 TypeScript가 각 case에서 정확한 타입을 알아냄!

### 왜 강력하냐면

```typescript
// 새 타입 추가하면?
export interface MockResultTimeout {
  type: 'timeout'
  duration: number
}
export type MockResult<T> = ... | MockResultTimeout

// switch에서 'timeout' case를 안 넣으면 TypeScript가 경고!
// → 빠뜨릴 수가 없음
```

### 직접 만들어보기

```typescript
// 과제: 파일 시스템 이벤트를 판별 유니온으로 설계
interface FileCreated {
  type: 'created'
  path: string
  content: string
}
interface FileModified {
  type: 'modified'
  path: string
  oldContent: string
  newContent: string
}
interface FileDeleted {
  type: 'deleted'
  path: string
}

type FileEvent = FileCreated | FileModified | FileDeleted

function describeEvent(event: FileEvent): string {
  // TODO: switch/case로 각 타입별 설명 반환
  // TypeScript가 각 case에서 올바른 프로퍼티만 접근 허용하는지 확인!
}

// 보너스: 빠짐없이 처리했는지 컴파일 타임에 보장하는 exhaustive check
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`)
}
```

---

## 패턴 4: Utility Types — 타입 조합의 레고 블록

### 쉬운 설명

TypeScript 내장 유틸리티 타입으로 기존 타입을 변형한다.

```typescript
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

Partial<User>       // 모든 필드가 optional
Required<User>      // 모든 필드가 required
Readonly<User>      // 모든 필드가 readonly
Pick<User, 'id' | 'name'>    // id, name만 추출
Omit<User, 'role'>            // role만 제외
Record<string, User>          // { [key: string]: User }
```

### Vitest에서 어떻게 쓰여?

**1. Omit — 필드 제거** — `packages/runner/src/types/tasks.ts:476`

```typescript
// TestOptions에서 shuffle만 빼고 다 가져옴
type TestCollectorOptions = Omit<TestOptions, 'shuffle'>
```

```typescript
// TestOptions에서 tags, shuffle 빼고 가져온 뒤 name, description 추가
export interface TestTagDefinition extends Omit<TestOptions, 'tags' | 'shuffle'> {
  name: string
  description?: string
  priority?: number
}
```

왜? `TestOptions`에 필드가 20개 있으면 18개를 다시 타이핑하는 것보다 `Omit`으로 2개만 빼는 게 낫지.

**2. Partial — 상태 업데이트** — `packages/expect/src/types.ts:125`

```typescript
setState: (state: Partial<MatcherState>) => void
```

`MatcherState`의 일부 필드만 업데이트할 수 있게. React의 `setState`와 같은 패턴!

**3. Readonly — 불변 보장** — `packages/expect/src/types.ts:88`

```typescript
task?: Readonly<Test>
```

테스트 실행 중에 task 객체를 실수로 수정하는 걸 방지.

**4. Record — 맵핑 객체** — `packages/runner/src/types/tasks.ts:182`

```typescript
hooks?: Partial<Record<keyof SuiteHooks, TaskState>>
// → { beforeAll?: TaskState, afterAll?: TaskState, beforeEach?: TaskState, ... }
```

`keyof SuiteHooks`의 모든 키를 `TaskState` 값으로 맵핑.

### 직접 만들어보기

```typescript
// 과제: Utility Types를 조합해서 실용적인 타입 만들기

interface Config {
  host: string
  port: number
  database: string
  password: string
  debug: boolean
  logLevel: 'info' | 'warn' | 'error'
}

// 1. 비밀번호를 제외한 설정 (로깅용)
type SafeConfig = Omit<Config, 'password'>

// 2. 설정 업데이트 함수 — 일부만 변경 가능
function updateConfig(current: Config, updates: Partial<Config>): Config {
  // TODO: 불변성 유지하면서 업데이트
}

// 3. 읽기 전용 설정
type FrozenConfig = Readonly<Config>

// 4. 여러 환경의 설정을 담는 타입
type Environment = 'dev' | 'staging' | 'prod'
type AllConfigs = Record<Environment, Config>

// 5. 데이터베이스 연결에 필요한 것만 추출
type DbConfig = Pick<Config, 'host' | 'port' | 'database' | 'password'>
```

---

## 패턴 5: 조건부 타입 (Conditional Types) — 타입 레벨 if/else

### 쉬운 설명

```typescript
// 타입에서도 조건 분기가 된다!
type IsString<T> = T extends string ? 'yes' : 'no'

IsString<string>   // 'yes'
IsString<number>   // 'no'
IsString<'hello'>  // 'yes' — 'hello'는 string의 하위 타입
```

### `infer` — 타입에서 값 추출하기

```typescript
// "T가 배열이면 요소 타입을 추출하고, 아니면 T 그대로"
type Unpack<T> = T extends Array<infer U> ? U : T

Unpack<string[]>   // string — 배열에서 string 추출
Unpack<number>     // number — 배열 아니니까 그대로
```

`infer`는 **"이 자리에 있는 타입을 변수 U에 담아줘"**라는 뜻.

### Vitest에서 어떻게 쓰여?

**1. 재귀적 깊은 매칭** — `packages/expect/src/types.ts:211`

```typescript
export type DeeplyAllowMatchers<T> =
  T extends Array<infer Element>
    ? WithAsymmetricMatcher<T> | DeeplyAllowMatchers<Element>[]  // 배열이면 재귀
    : T extends object
      ? WithAsymmetricMatcher<T> | { [K in keyof T]: DeeplyAllowMatchers<T[K]> }  // 객체면 각 필드 재귀
      : WithAsymmetricMatcher<T>  // 원시값이면 끝
```

이게 뭘 하냐면, `expect({ a: [1, 2] }).toEqual(...)` 할 때 깊은 중첩 구조에서도 `expect.any(Number)` 같은 matcher를 쓸 수 있게 해줌.

**2. 함수를 Promise로 변환** — `packages/expect/src/types.ts:632`

```typescript
type Promisify<O> = {
  [K in keyof O]: O[K] extends (...args: infer A) => infer R
    ? Promisify<O[K]> & ((...args: A) => Promise<R>)  // 함수면 반환값을 Promise로
    : O[K]  // 함수 아니면 그대로
}
```

`infer A`로 인자 타입, `infer R`로 반환 타입을 추출한 뒤, 반환값만 `Promise<R>`로 바꿈.

**3. Mock 파라미터 추출** — `packages/spy/src/types.ts:44`

```typescript
// 생성자면 ConstructorParameters, 일반 함수면 Parameters
export type MockParameters<T extends Procedure | Constructable> =
  T extends Constructable
    ? ConstructorParameters<T>
    : T extends Procedure
      ? Parameters<T>
      : never
```

### 핵심 규칙

```
T extends X ? A : B     → 타입 레벨 if/else
T extends Array<infer U> → 배열에서 요소 타입 추출
T extends (...args: infer A) => infer R → 함수에서 인자/반환 타입 추출
```

### 직접 만들어보기

```typescript
// 과제 1: Promise를 벗기는 타입
type Unwrap<T> = T extends Promise<infer U> ? U : T

type A = Unwrap<Promise<string>>  // string
type B = Unwrap<number>           // number

// 과제 2: 함수의 첫 번째 인자 타입 추출
type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never

type C = FirstArg<(name: string, age: number) => void>  // string

// 과제 3: 깊은 Readonly (재귀)
type DeepReadonly<T> = {
  // TODO: T가 객체면 각 필드를 재귀적으로 Readonly
  // 원시값이면 그대로
}

type Test = DeepReadonly<{ a: { b: { c: number } } }>
// → { readonly a: { readonly b: { readonly c: number } } }
```

---

## 패턴 6: 함수 오버로드 — 하나의 함수, 여러 시그니처

### 쉬운 설명

같은 함수인데 인자 조합에 따라 다른 타입을 반환하고 싶을 때.

```typescript
// 오버로드 시그니처 (타입만 선언)
function parse(input: string): number
function parse(input: number): string

// 구현 시그니처 (실제 로직)
function parse(input: string | number): number | string {
  if (typeof input === 'string') return Number(input)
  return String(input)
}

parse('42')   // 반환 타입: number
parse(42)     // 반환 타입: string
```

### Vitest에서 어떻게 쓰여?

**1. withImplementation** — `packages/spy/src/types.ts:287`

```typescript
// 콜백이 async면 Promise<this> 반환
withImplementation(fn: NormalizedProcedure<T>, cb: () => Promise<unknown>): Promise<this>
// 콜백이 sync면 this 반환
withImplementation(fn: NormalizedProcedure<T>, cb: () => unknown): this
```

```typescript
// 사용할 때 TypeScript가 자동으로 구분:
mock.withImplementation(() => 42, () => {
  // sync 콜백 → 반환 타입: Mock (this)
})

mock.withImplementation(() => 42, async () => {
  // async 콜백 → 반환 타입: Promise<Mock>
  await someAsyncWork()
})
```

**2. test.for — 옵션 유무에 따른 오버로드** — `packages/runner/src/types/tasks.ts:408`

```typescript
interface TestForFunctionReturn<Arg, Context> {
  // 옵션 없이 사용
  (
    name: string | Function,
    fn: (arg: Arg, context: Context) => Awaitable<void>,
  ): void

  // 옵션 포함 사용
  (
    name: string | Function,
    options: TestCollectorOptions,
    fn: (arg: Arg, context: Context) => Awaitable<void>,
  ): void
}
```

```typescript
// 둘 다 가능:
test.for([1, 2, 3])('test %s', (num) => { ... })
test.for([1, 2, 3])('test %s', { timeout: 5000 }, (num) => { ... })
```

### 직접 만들어보기

```typescript
// 과제: createElement 오버로드
// - 태그가 'input'이면 HTMLInputElement 반환
// - 태그가 'div'이면 HTMLDivElement 반환
// - 그 외 문자열이면 HTMLElement 반환

function createElement(tag: 'input'): HTMLInputElement
function createElement(tag: 'div'): HTMLDivElement
function createElement(tag: string): HTMLElement
function createElement(tag: string): HTMLElement {
  return document.createElement(tag)
}

const input = createElement('input')  // HTMLInputElement
input.value  // OK! HTMLInputElement에 value가 있으니까

const div = createElement('div')  // HTMLDivElement
```

---

## 패턴 7: Mapped Types — 타입을 변환하는 반복문

### 쉬운 설명

객체 타입의 모든 키를 순회하면서 변환하는 패턴. `for...in`의 타입 버전.

```typescript
// 모든 프로퍼티를 optional로
type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

// 모든 프로퍼티를 readonly로
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

### 키 필터링 (`as` + `never`)

```typescript
// 함수인 프로퍼티만 추출
type MethodsOnly<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K]
}

interface User {
  name: string
  age: number
  greet(): void
  save(): Promise<void>
}

type UserMethods = MethodsOnly<User>
// → { greet(): void; save(): Promise<void> }
```

### Vitest에서 어떻게 쓰여?

**1. 함수 키만 추출** — `packages/spy/src/types.ts:185`

```typescript
export type Methods<T> = keyof {
  [K in keyof T as T[K] extends Procedure ? K : never]: T[K]
}
```

`vi.spyOn(obj, 'methodName')`에서 `methodName`이 실제 메서드인지 타입 레벨에서 보장.

**2. 함수가 아닌 프로퍼티만 추출**

```typescript
export type Properties<T> = {
  [K in keyof T]: T[K] extends Procedure ? never : K
}[keyof T] & (string | symbol)
```

**3. 생성자만 추출**

```typescript
export type Classes<T> = {
  [K in keyof T]: T[K] extends new (...args: any[]) => any ? K : never
}[keyof T] & (string | symbol)
```

### 직접 만들어보기

```typescript
// 과제 1: 모든 프로퍼티를 getter로 변환
type Getters<T> = {
  // TODO: name → getName 형태로 변환
  // 힌트: `as `get${Capitalize<string & K>}`` 사용
}

interface Person { name: string; age: number }
type PersonGetters = Getters<Person>
// → { getName: () => string; getAge: () => number }

// 과제 2: 특정 타입의 프로퍼티만 추출
type PickByType<T, ValueType> = {
  // TODO: 값이 ValueType인 프로퍼티만 남기기
}

interface Mixed { a: string; b: number; c: string; d: boolean }
type StringProps = PickByType<Mixed, string>
// → { a: string; c: string }
```

---

## 패턴 8: 모듈 확장 (Module Augmentation) — 남의 타입 확장하기

### 쉬운 설명

외부 라이브러리의 타입에 새 필드를 추가하고 싶을 때. 라이브러리 코드를 수정하지 않고!

```typescript
// 원래 express의 Request에는 user가 없음
// 하지만 미들웨어에서 붙여줬으니까 타입에도 추가하고 싶음

declare module 'express' {
  interface Request {
    user?: { id: string; name: string }
  }
}

// 이제 어디서든:
app.get('/', (req, res) => {
  req.user?.name  // 타입 에러 없음!
})
```

### Vitest에서 어떻게 쓰여?

**`packages/vitest/src/types/global.ts:24`** — 핵심 패턴!

```typescript
// @vitest/expect 패키지의 인터페이스를 확장
declare module '@vitest/expect' {
  // MatcherState에 필드 추가
  interface MatcherState {
    environment: string
    snapshotState: SnapshotState
  }

  // ExpectStatic에 메서드 추가
  interface ExpectStatic {
    assert: Chai.AssertStatic
    unreachable: (message?: string) => never
    soft: <T>(actual: T, message?: string) => Assertion<T>
  }

  // Assertion에 스냅샷 matcher 추가
  interface Assertion<T> {
    matchSnapshot: SnapshotMatcher<T>
    toMatchSnapshot: SnapshotMatcher<T>
    toMatchInlineSnapshot: InlineSnapshotMatcher<T>
  }
}

// @vitest/runner 패키지의 인터페이스도 확장
declare module '@vitest/runner' {
  interface TestContext {
    readonly expect: ExpectStatic
    _local: boolean
  }
}
```

**이게 왜 강력하냐면:**

Vitest는 모노레포야. `@vitest/expect`, `@vitest/runner` 등 패키지가 나뉘어 있는데, 각 패키지는 서로의 구현을 모름. 하지만 `vitest` 메인 패키지에서 모듈 확장으로 타입을 합쳐줌.

```
@vitest/expect  →  Assertion<T> { toBe, toEqual, ... }
                           ↓ 모듈 확장
vitest          →  Assertion<T> { toBe, toEqual, ..., toMatchSnapshot }
```

### 직접 만들어보기

```typescript
// 과제: 글로벌 Window 타입 확장
declare global {
  interface Window {
    // TODO: analytics 객체 추가
    analytics: {
      track: (event: string, data?: Record<string, unknown>) => void
      identify: (userId: string) => void
    }
  }
}

// 이제 타입 에러 없이:
window.analytics.track('page_view', { page: '/home' })
```

---

## 패턴 9: `satisfies` — 타입 검증하되 추론은 유지

### 쉬운 설명

```typescript
// 방법 1: 타입 어노테이션 — 추론이 넓어짐
const colors: Record<string, string> = {
  red: '#ff0000',
  green: '#00ff00',
}
colors.red     // string (구체적 값을 모름)
colors.blue    // 에러 안 남! (Record<string, string>이라 아무 키나 됨)

// 방법 2: satisfies — 검증 + 좁은 추론 유지
const colors = {
  red: '#ff0000',
  green: '#00ff00',
} satisfies Record<string, string>
colors.red     // '#ff0000' (리터럴 타입!)
colors.blue    // 에러! (red, green만 있으니까)
```

**핵심: `satisfies`는 "이 타입을 만족하는지 검증하되, 더 구체적인 타입 추론은 유지"**

### Vitest에서 어떻게 쓰여?

**`packages/runner/src/fixture.ts:35`**

```typescript
private static _builtinFixtures: string[] = [
  'task',
  'signal',
  'onTestFailed',
  'onTestFinished',
  'skip',
  'annotate',
] satisfies (keyof TestContext)[]
```

`satisfies (keyof TestContext)[]`가 하는 일:
- 배열의 모든 값이 `TestContext`의 실제 키인지 **컴파일 타임에 검증**
- `'task'`가 `TestContext`에 없으면 에러!
- 하지만 변수 타입은 `string[]`로 유지 (유연성)

**`packages/integrations/chai/poll.ts:162`**

```typescript
return {
  then(onFulfilled, onRejected) { /* ... */ },
  catch(onRejected) { /* ... */ },
  finally(onFinally) { /* ... */ },
  [Symbol.toStringTag]: 'Promise',
} satisfies Promise<void>
```

이 객체가 `Promise<void>` 인터페이스를 만족하는지 검증. 빠진 메서드가 있으면 에러.

### 직접 만들어보기

```typescript
// 과제: 라우트 설정에 satisfies 적용

type Route = {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  handler: string
}

// satisfies로 검증하면서 구체적 타입 유지
const routes = [
  { path: '/users', method: 'GET', handler: 'getUsers' },
  { path: '/users', method: 'POST', handler: 'createUser' },
  { path: '/users/:id', method: 'PUT', handler: 'updateUser' },
] satisfies Route[]

// routes[0].method 의 타입은? → 'GET' (리터럴!)
// satisfies 없이 Route[]로 선언하면 → 'GET' | 'POST' | 'PUT' | 'DELETE' (넓어짐)
```

---

## 패턴 10: `as const` — 리터럴 타입 고정

### 쉬운 설명

```typescript
// 일반 선언 — 타입이 넓어짐
const config = { mode: 'test', port: 3000 }
// config.mode → string (🙁)
// config.port → number

// as const — 리터럴 타입 고정
const config = { mode: 'test', port: 3000 } as const
// config.mode → 'test' (😊)
// config.port → 3000
// 전체가 readonly가 됨
```

### Vitest에서 어떻게 쓰여?

**`packages/runner/src/fixture.ts:39`**

```typescript
private static _workerContextSuite = { type: 'worker' } as const
// type 필드가 string이 아니라 정확히 'worker'
```

이게 판별 유니온(패턴 3)과 결합되면:

```typescript
type Suite = { type: 'suite'; name: string } | { type: 'worker' }

// as const 없으면
const obj = { type: 'worker' }  // type: string → Suite로 좁히기 불가
// as const 있으면
const obj = { type: 'worker' } as const  // type: 'worker' → 정확히 매칭!
```

### 직접 만들어보기

```typescript
// 과제: as const로 타입 안전한 이벤트 시스템
const EVENTS = {
  USER_LOGIN: 'user:login',
  USER_LOGOUT: 'user:logout',
  PAGE_VIEW: 'page:view',
} as const

// EventName 타입을 EVENTS의 값으로 만들기
type EventName = typeof EVENTS[keyof typeof EVENTS]
// → 'user:login' | 'user:logout' | 'page:view'

function emit(event: EventName, data?: unknown) { /* ... */ }

emit('user:login')     // OK
emit('user:signup')    // Error! — 정의되지 않은 이벤트
emit(EVENTS.PAGE_VIEW) // OK
```

---

## 패턴 11: 라벨 튜플 (Labeled Tuples) — 의미 있는 배열 타입

### 쉬운 설명

```typescript
// 일반 튜플 — 각 위치가 뭔지 모름
type Result = [string, number, boolean]

// 라벨 튜플 — 의미가 명확!
type Result = [id: string, score: number, passed: boolean]
```

### Vitest에서 어떻게 쓰여?

**`packages/runner/src/types/tasks.ts:221`**

```typescript
export type TaskResultPack = [
  id: string,
  result: TaskResult | undefined,
  meta: TaskMeta,
]

export type TaskEventPack = [
  id: string,
  event: TaskUpdateEvent,
  data: TaskEventData | undefined,
]
```

왜 객체 대신 튜플? **성능과 직렬화.** 워커 간 통신에서 데이터를 주고받을 때, 객체보다 배열이 직렬화/역직렬화가 빠르다. 라벨은 개발자 편의를 위한 것이고 런타임에는 그냥 배열.

```typescript
// 사용할 때:
const [id, result, meta] = taskResultPack  // 구조 분해
```

### 직접 만들어보기

```typescript
// 과제: 좌표 시스템을 라벨 튜플로
type Point2D = [x: number, y: number]
type Point3D = [x: number, y: number, z: number]

// RGB 색상
type RGB = [red: number, green: number, blue: number]

// 범위
type Range = [start: number, end: number]

function distance(a: Point2D, b: Point2D): number {
  const [x1, y1] = a
  const [x2, y2] = b
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
```

---

## 패턴 12: `ReturnType` + `typeof` — 값에서 타입 추출

### 쉬운 설명

```typescript
function createUser() {
  return { id: 1, name: 'kim', role: 'admin' as const }
}

// 함수 반환값의 타입을 자동 추출
type User = ReturnType<typeof createUser>
// → { id: number; name: string; role: 'admin' }
```

`typeof`는 값 → 타입으로 변환, `ReturnType`은 함수 타입 → 반환 타입으로 변환.

### Vitest에서 어떻게 쓰여?

**`packages/expect/src/types.ts:78`**

```typescript
utils: ReturnType<typeof getMatcherUtils> & {
  diff: typeof diff
  stringify: typeof stringify
  iterableEquality: Tester
  subsetEquality: Tester
}
```

`getMatcherUtils` 함수의 반환 타입을 직접 안 쓰고 `ReturnType`으로 추출. 함수 구현이 바뀌면 타입도 자동으로 따라감!

### 직접 만들어보기

```typescript
// 과제: 팩토리 함수의 반환 타입 활용

function createStore(initialState: { count: number; name: string }) {
  return {
    getState: () => initialState,
    setState: (updates: Partial<typeof initialState>) => {
      Object.assign(initialState, updates)
    },
    subscribe: (cb: (state: typeof initialState) => void) => { /* ... */ },
  }
}

// ReturnType으로 Store 타입 추출
type Store = ReturnType<typeof createStore>

// 이제 Store 타입을 다른 곳에서 사용 가능
function useStore(store: Store) {
  const state = store.getState()
  state.count  // number — 타입 추론!
}
```

---

## 패턴 요약표

| # | 패턴 | 한줄 요약 | 난이도 |
|---|------|----------|--------|
| 1 | Generic | 타입을 변수처럼 | ★★☆ |
| 2 | 타입 가드 (is) | 런타임 체크로 타입 좁히기 | ★★☆ |
| 3 | 판별 유니온 | type 필드로 자동 분기 | ★★☆ |
| 4 | Utility Types | Partial, Omit, Pick 등 조합 | ★★☆ |
| 5 | 조건부 타입 + infer | 타입 레벨 if/else + 추출 | ★★★ |
| 6 | 함수 오버로드 | 인자별 다른 반환 타입 | ★★☆ |
| 7 | Mapped Types | 타입 변환 반복문 | ★★★ |
| 8 | 모듈 확장 | 외부 라이브러리 타입 확장 | ★★☆ |
| 9 | satisfies | 검증 + 추론 유지 | ★☆☆ |
| 10 | as const | 리터럴 타입 고정 | ★☆☆ |
| 11 | 라벨 튜플 | 의미 있는 배열 타입 | ★☆☆ |
| 12 | ReturnType + typeof | 값에서 타입 추출 | ★★☆ |

---

## 학습 순서 추천

```
Week 1: 기초 — 바로 쓸 수 있는 것들
  패턴 10 (as const) → 패턴 9 (satisfies) → 패턴 11 (라벨 튜플)
  → 패턴 4 (Utility Types)

Week 2: 중급 — 코드 읽기에 필수
  패턴 1 (Generic) → 패턴 2 (타입 가드) → 패턴 3 (판별 유니온)
  → 패턴 6 (함수 오버로드)

Week 3: 고급 — 라이브러리 설계 수준
  패턴 5 (조건부 타입 + infer) → 패턴 7 (Mapped Types)
  → 패턴 8 (모듈 확장) → 패턴 12 (ReturnType + typeof)

보너스: type-challenges (github.com/type-challenges/type-challenges)
  easy 10개 → medium 10개 풀기
```

## 연습 원칙

1. **각 패턴의 "직접 만들어보기"를 전부 풀어라** — 읽는 것과 쓰는 것은 다르다
2. **Vitest 코드에서 해당 패턴이 쓰인 파일을 직접 열어서 전체 맥락을 읽어라**
3. **type-challenges에서 해당 패턴을 연습하라** — 타입 체조로 체화
4. **네 회사 프로젝트에 하나씩 적용해봐라** — 실전이 최고의 연습
