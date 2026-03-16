---
title: "Vitest에서 쓰이는 JS 중고급 패턴 학습 가이드"
type: docs
status: active
date: 2026-03-17
---

# Vitest에서 쓰이는 JS/TS 중고급 패턴 완전 정복

> Vitest 코드를 읽다가 "이게 뭐지?" 하고 멈추는 패턴들을 모았다.
> **중요도 + 난이도** 순으로 정렬 — 위에서부터 차례로 학습하면 된다.
> 각 패턴마다 **왜 쓰는지 → Vitest 실제 코드 → React/실무 활용 → 직접 만들어보기**

---

## 패턴 1: 고차 함수(HOF) — 함수를 감싸서 기능 추가

> 중요도: ★★★★★ | 난이도: ★★☆ | **가장 먼저 익혀야 할 패턴**

### 왜 필요해?

원래 함수를 수정하지 않고, 감싸서 기능(타임아웃, 로깅, 재시도 등)을 추가한다.

### Vitest에서 어떻게 쓰여?

**1. withTimeout** — `packages/runner/src/context.ts:40`

테스트/훅 함수에 타임아웃을 감싸는 패턴. Vitest에서 가장 중요한 HOF!

```typescript
export function withTimeout<T extends (...args: any[]) => any>(
  fn: T,           // 원래 함수
  timeout: number, // 제한 시간
  isHook: boolean,
  stackTraceError?: Error,
): T {
  // 타임아웃 없으면 원래 함수 그대로 반환
  if (timeout <= 0 || timeout === Number.POSITIVE_INFINITY) {
    return fn
  }

  const { setTimeout, clearTimeout } = getSafeTimers()

  // 감싸진 새 함수 반환
  return (function runWithTimeout(...args) {
    return new Promise((resolve_, reject_) => {
      const timer = setTimeout(() => {
        reject_(makeTimeoutError(isHook, timeout, stackTraceError))
      }, timeout)

      try {
        const result = fn(...args)
        if (result && typeof result.then === 'function') {
          result.then(resolve, reject_)
        } else {
          resolve(result)
        }
      } catch (error) {
        reject_(error)
      }

      function resolve(result) {
        clearTimeout(timer)
        resolve_(result)
      }
    })
  }) as T
}
```

**2. withCancel** — `packages/runner/src/context.ts:114`

```typescript
export function withCancel<T extends (...args: any[]) => any>(
  fn: T,
  signal: AbortSignal,
): T {
  return (function runWithCancel(...args) {
    return new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason))
      const result = fn(...args)
      if (typeof result?.then === 'function') {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    })
  }) as T
}
```

**3. 여러 HOF 조합** — `packages/runner/src/hooks.ts:86`

```typescript
// withTimeout + Object.assign + Symbol 조합!
Object.assign(
  withTimeout(fn, timeout, true, stackTraceError),
  {
    [CLEANUP_TIMEOUT_KEY]: timeout,
    [CLEANUP_STACK_TRACE_KEY]: stackTraceError,
  },
)
```

### React/실무에서 어떻게 쓰여?

```typescript
// 1. React의 memo, forwardRef, lazy가 전부 HOF
const MemoizedComponent = React.memo(MyComponent)
const LazyComponent = React.lazy(() => import('./Heavy'))

// 2. 커스텀 훅 = HOF의 React 버전
function useWithLoading<T>(asyncFn: () => Promise<T>) {
  const [loading, setLoading] = useState(false)
  const execute = useCallback(async () => {
    setLoading(true)
    try { return await asyncFn() }
    finally { setLoading(false) }
  }, [asyncFn])
  return { execute, loading }
}

// 3. API 클라이언트에서 인증 헤더 자동 추가
function withAuth(fetchFn: typeof fetch): typeof fetch {
  return (url, options = {}) => {
    const token = getToken()
    return fetchFn(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    })
  }
}
const authFetch = withAuth(fetch)

// 4. 에러 바운더리 래퍼
function withErrorBoundary(Component: React.FC) {
  return (props: any) => (
    <ErrorBoundary fallback={<ErrorUI />}>
      <Component {...props} />
    </ErrorBoundary>
  )
}

// 5. withRetry — API 호출 재시도
function withRetry(fn: Function, maxRetries = 3) {
  return async (...args: any[]) => {
    for (let i = 0; i < maxRetries; i++) {
      try { return await fn(...args) }
      catch (e) { if (i === maxRetries - 1) throw e }
    }
  }
}
```

### 핵심 규칙

```
withXxx(fn) → 새 함수 반환
  - 원래 함수 수정 없이 기능 추가
  - 여러 with를 조합 가능: withTimeout(withCancel(withRetry(fn)))
  - React에서는 커스텀 훅이 이 역할을 대신함
```

### 직접 만들어보기

```typescript
// 과제 1: withRetry — 실패하면 N번 재시도
function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  maxRetries: number,
): T {
  // TODO: 실패하면 maxRetries번까지 재시도
}

// 과제 2: withLogging
function withLogging<T extends (...args: any[]) => any>(name: string, fn: T): T {
  // TODO: 호출/완료/에러 로깅
}

// 과제 3: 조합
const fetchData = withLogging('fetchData',
  withRetry(async (url: string) => fetch(url), 3)
)
```

---

## 패턴 2: AbortController — 취소 가능한 비동기 작업

> 중요도: ★★★★★ | 난이도: ★★☆ | **React에서 매일 쓰는 패턴**

### 왜 필요해?

컴포넌트가 언마운트됐는데 fetch가 아직 진행 중이면? 응답이 돌아와서 setState를 하면 메모리 누수 + 에러.

### Vitest에서 어떻게 쓰여?

**`packages/runner/src/context.ts:139`**

```typescript
const abortControllers = new WeakMap<TestContext, AbortController>()

// 테스트 설정 시
let abortController = abortControllers.get(context)
if (!abortController) {
  abortController = new AbortController()
  abortControllers.set(context, abortController)
}
context.signal = abortController.signal

// 타임아웃 발생 시 테스트 중단
export function abortContextSignal(context: TestContext, error: Error): void {
  const abortController = abortControllers.get(context)
  abortController?.abort(error)
}
```

### React/실무에서 어떻게 쓰여?

```typescript
// 1. useEffect에서 fetch 취소 — 가장 기본!
useEffect(() => {
  const controller = new AbortController()

  fetch('/api/users', { signal: controller.signal })
    .then(res => res.json())
    .then(setUsers)
    .catch(err => {
      if (err.name !== 'AbortError') throw err  // abort는 무시
    })

  return () => controller.abort()  // cleanup에서 취소!
}, [])

// 2. 검색 자동완성 — 이전 요청 취소
function useSearch(query: string) {
  const [results, setResults] = useState([])
  const controllerRef = useRef<AbortController>()

  useEffect(() => {
    controllerRef.current?.abort()  // 이전 요청 취소!
    const controller = new AbortController()
    controllerRef.current = controller

    fetch(`/api/search?q=${query}`, { signal: controller.signal })
      .then(res => res.json())
      .then(setResults)
      .catch(() => {})

    return () => controller.abort()
  }, [query])

  return results
}

// 3. 타임아웃 있는 fetch
async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}
```

### 핵심 규칙

```
AbortController = 신호 보내는 쪽 (abort() 호출)
AbortSignal     = 신호 받는 쪽 (signal 전달)

React에서:
- useEffect의 cleanup → controller.abort()
- 새 요청 전 → 이전 controller.abort()
```

### 직접 만들어보기

```typescript
// 과제 1: 취소 가능한 delay
function cancellableDelay(ms: number, signal?: AbortSignal): Promise<void> {
  // TODO: signal abort 시 즉시 reject, setTimeout 정리
}

// 과제 2: useFetch 커스텀 훅 (abort 포함)
function useFetch<T>(url: string): { data: T | null; loading: boolean; error: Error | null } {
  // TODO: useEffect + AbortController + 상태 관리
}
```

---

## 패턴 3: Promise 중복 제거 — 같은 요청 1번만 실행

> 중요도: ★★★★☆ | 난이도: ★★☆ | **SWR/TanStack Query의 핵심 원리**

### 왜 필요해?

같은 API를 여러 컴포넌트에서 동시에 호출하면, 실제로는 1번만 요청하고 결과를 공유하는 게 효율적.

### Vitest에서 어떻게 쓰여?

**`packages/vitest/src/node/cache/fsModuleCache.ts:72`**

```typescript
const parallelFsCacheRead = new Map<string, Promise<...>>()

private readCachedFileConcurrently(cachedFilePath: string) {
  if (!parallelFsCacheRead.has(cachedFilePath)) {
    parallelFsCacheRead.set(
      cachedFilePath,
      readFile(cachedFilePath, 'utf-8')
        .then((code) => { /* 파싱 */ })
        .finally(() => {
          parallelFsCacheRead.delete(cachedFilePath)  // 완료 후 제거
        })
    )
  }
  return parallelFsCacheRead.get(cachedFilePath)!
}
```

### React/실무에서 어떻게 쓰여?

```typescript
// 1. SWR/TanStack Query가 내부적으로 이걸 해줌
// 같은 key로 여러 컴포넌트가 useSWR 호출해도 요청은 1번
const { data } = useSWR('/api/users', fetcher)

// 2. 직접 구현한 요청 중복제거
const pending = new Map<string, Promise<any>>()

export async function fetchOnce<T>(url: string): Promise<T> {
  if (!pending.has(url)) {
    pending.set(
      url,
      fetch(url)
        .then(r => r.json())
        .finally(() => pending.delete(url))
    )
  }
  return pending.get(url)!
}

// 3. React 컴포넌트에서 — 3개 컴포넌트가 동시에 호출해도 1번만 fetch
function UserProfile() {
  const { data } = useQuery({ queryKey: ['user'], queryFn: () => fetchOnce('/api/me') })
}
function UserAvatar() {
  const { data } = useQuery({ queryKey: ['user'], queryFn: () => fetchOnce('/api/me') })
}
// → /api/me 요청은 1번만 나감!

// 4. 이미지 프리로딩 중복제거
const imageCache = new Map<string, Promise<HTMLImageElement>>()

function preloadImage(src: string): Promise<HTMLImageElement> {
  if (!imageCache.has(src)) {
    imageCache.set(src, new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    }))
  }
  return imageCache.get(src)!
}
```

### 핵심 아이디어

```
1. 요청 오면 Map에 Promise 있는지 확인
2. 없으면 → 새로 만들어서 Map에 저장
3. 있으면 → 기존 Promise 반환 (결과 공유)
4. 완료되면 → Map에서 삭제 (다음엔 새로 요청)
```

### 직접 만들어보기

```typescript
// 과제: 범용 dedupe 래퍼
function dedupe<T>(fn: (key: string) => Promise<T>): (key: string) => Promise<T> {
  // TODO: 같은 key로 동시 호출 시 하나만 실행
}

// 테스트
const fetchUser = dedupe(async (id: string) => {
  console.log(`fetching ${id}...`)
  return { id, name: 'kim' }
})

await Promise.all([
  fetchUser('1'),  // "fetching 1..." (실행)
  fetchUser('1'),  // (공유)
  fetchUser('2'),  // "fetching 2..." (다른 key니까 실행)
])
```

---

## 패턴 4: Deferred Promise — 외부에서 resolve/reject

> 중요도: ★★★★☆ | 난이도: ★★★ | **이벤트 기반 코드의 핵심**

### 왜 필요해?

보통 Promise는 생성자 안에서만 resolve 가능. 하지만 "나중에 어딘가에서" resolve 하고 싶을 때가 있다.

### Vitest에서 어떻게 쓰여?

**`packages/utils/src/helpers.ts:270`**

```typescript
export type DeferPromise<T> = Promise<T> & {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export function createDefer<T>(): DeferPromise<T> {
  let resolve: ((value: T | PromiseLike<T>) => void) | null = null
  let reject: ((reason?: any) => void) | null = null

  const p = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as DeferPromise<T>

  p.resolve = resolve!
  p.reject = reject!
  return p
}
```

### React/실무에서 어떻게 쓰여?

```typescript
// 1. 모달 확인 대기
function useConfirmDialog() {
  const deferRef = useRef<DeferPromise<boolean>>()

  const confirm = (message: string): Promise<boolean> => {
    const defer = createDefer<boolean>()
    deferRef.current = defer
    setMessage(message)
    setOpen(true)
    return defer  // 사용자가 버튼 누를 때까지 대기
  }

  const handleOk = () => { deferRef.current?.resolve(true); setOpen(false) }
  const handleCancel = () => { deferRef.current?.resolve(false); setOpen(false) }

  return { confirm, handleOk, handleCancel }
}

// 사용:
const { confirm } = useConfirmDialog()
if (await confirm('삭제할까요?')) {
  deleteItem()
}

// 2. WebSocket 응답 대기
const pendingRequests = new Map<string, DeferPromise<any>>()

function sendAndWait(type: string, data: any): Promise<any> {
  const id = crypto.randomUUID()
  const defer = createDefer()
  pendingRequests.set(id, defer)
  ws.send(JSON.stringify({ id, type, data }))
  return defer  // 응답 올 때까지 대기
}

ws.onmessage = (event) => {
  const { id, result } = JSON.parse(event.data)
  pendingRequests.get(id)?.resolve(result)  // 여기서 resolve!
  pendingRequests.delete(id)
}
```

### 직접 만들어보기

```typescript
// 과제 1: createDefer 직접 구현 (위 코드 보지 말고!)

// 과제 2: 모달 확인 시뮬레이션
async function main() {
  const defer = createDefer<boolean>()

  // 2초 후 "확인" 누른 것처럼
  setTimeout(() => defer.resolve(true), 2000)

  const result = await defer
  console.log(result ? '확인됨' : '취소됨')
}
```

---

## 패턴 5: Lazy Initialization — 처음 쓸 때만 계산

> 중요도: ★★★★☆ | 난이도: ★☆☆ | **React의 useMemo, lazy와 같은 발상**

### 왜 필요해?

비싼 계산을 실제로 필요할 때까지 미루는 것.

### Vitest에서 어떻게 쓰여?

**`packages/vitest/src/node/reporters/reported-tasks.ts:131`**

```typescript
export class TestCase extends ReportedTaskImplementation {
  #fullName: string | undefined

  public get fullName(): string {
    if (this.#fullName === undefined) {
      if (this.parent.type !== 'module') {
        this.#fullName = `${this.parent.fullName} > ${this.name}`
      } else {
        this.#fullName = this.name
      }
    }
    return this.#fullName
  }
}
```

### React/실무에서 어떻게 쓰여?

```typescript
// 1. React.lazy — 컴포넌트를 처음 렌더링할 때만 로드
const HeavyChart = React.lazy(() => import('./HeavyChart'))

// 2. useMemo — 값을 의존성 변할 때만 재계산
const sorted = useMemo(() => {
  return items.sort((a, b) => a.price - b.price)  // 비싼 정렬
}, [items])

// 3. useRef로 한 번만 초기화
function useOnce<T>(factory: () => T): T {
  const ref = useRef<T>()
  if (!ref.current) {
    ref.current = factory()
  }
  return ref.current
}

const socket = useOnce(() => new WebSocket('wss://...'))

// 4. 모듈 레벨 lazy singleton
let _db: Database | null = null
function getDB(): Database {
  if (!_db) {
    _db = new Database(process.env.DB_URL)
  }
  return _db
}
```

### 직접 만들어보기

```typescript
// 과제: Lazy 클래스 만들기
class Lazy<T> {
  #value: T | undefined
  #factory: () => T

  constructor(factory: () => T) {
    this.#factory = factory
  }

  get value(): T {
    // TODO: 처음에만 factory 실행, 이후 캐시
  }
}

const expensive = new Lazy(() => {
  console.log('계산 중...')
  return Array.from({ length: 1000000 }, (_, i) => i)
})
expensive.value  // "계산 중..." 출력
expensive.value  // 출력 없음 (캐시됨)
```

---

## 패턴 6: WeakMap — GC 안전한 메타데이터 저장

> 중요도: ★★★☆☆ | 난이도: ★★☆ | **라이브러리/프레임워크 만들 때 필수**

### 왜 필요해?

객체에 메타데이터를 붙이고 싶은데, 그 객체가 GC될 때 메타데이터도 같이 사라져야 할 때.

```typescript
// Map — 메모리 누수
const cache = new Map()
let obj = { data: 'big' }
cache.set(obj, 'metadata')
obj = null  // obj는 없앴지만 Map이 참조 → GC 안 됨!

// WeakMap — 안전
const cache = new WeakMap()
let obj = { data: 'big' }
cache.set(obj, 'metadata')
obj = null  // 참조 없으면 GC 알아서 제거!
```

### Vitest에서 어떻게 쓰여?

```typescript
// fixture cleanup — packages/runner/src/fixture.ts:237
const cleanupFnArrayMap = new WeakMap<object, Array<() => void | Promise<void>>>()

// mock 설정 — packages/spy/src/index.ts:25
const MOCK_CONFIGS = new WeakMap<Mock, MockConfig>()

// AbortController 관리 — packages/runner/src/context.ts:139
const abortControllers = new WeakMap<TestContext, AbortController>()
```

### React/실무에서 어떻게 쓰여?

```typescript
// 1. DOM 요소에 데이터 연결 (React 내부가 이렇게 동작)
const elementData = new WeakMap<HTMLElement, { clickCount: number }>()

function trackClicks(element: HTMLElement) {
  const data = elementData.get(element) ?? { clickCount: 0 }
  data.clickCount++
  elementData.set(element, data)
  // element가 DOM에서 제거되면 data도 자동 GC
}

// 2. 컴포넌트 인스턴스별 캐시
const renderCache = new WeakMap<object, JSX.Element>()

function cachedRender(props: object, render: () => JSX.Element) {
  if (!renderCache.has(props)) {
    renderCache.set(props, render())
  }
  return renderCache.get(props)!
}

// 3. 이벤트 핸들러 추적 (cleanup용)
const listeners = new WeakMap<EventTarget, Set<Function>>()
```

### 직접 만들어보기

```typescript
// 과제: weakMemoize
function weakMemoize<T extends object, R>(fn: (arg: T) => R): (arg: T) => R {
  // TODO: WeakMap 캐시 구현
}

const getSize = weakMemoize((arr: number[]) => {
  console.log('계산 중...')
  return arr.length
})
const arr = [1, 2, 3]
getSize(arr)  // "계산 중..."
getSize(arr)  // 캐시에서 (출력 없음)
```

---

## 패턴 7: Symbol — 숨겨진 프라이빗 키

> 중요도: ★★★☆☆ | 난이도: ★★☆ | **라이브러리 설계 시 충돌 방지**

### 왜 필요해?

객체에 메타데이터를 붙이되, 일반 프로퍼티와 충돌하면 안 될 때.

```typescript
const SECRET = Symbol('secret')
const obj = { name: 'test', [SECRET]: 'hidden' }

Object.keys(obj)     // ['name'] — Symbol 키는 안 보임
JSON.stringify(obj)  // '{"name":"test"}' — 직렬화에도 안 나옴
obj[SECRET]          // 'hidden' — Symbol로만 접근 가능
```

### Vitest에서 어떻게 쓰여?

```typescript
// 네 PR #9861의 패턴!
const FIXTURE_STACK_TRACE_KEY = Symbol.for('VITEST_FIXTURE_STACK_TRACE')
fn[FIXTURE_STACK_TRACE_KEY] = new Error('STACK_TRACE_ERROR')

// 훅 메타데이터 — packages/runner/src/hooks.ts:30
const CLEANUP_TIMEOUT_KEY = Symbol.for('VITEST_CLEANUP_TIMEOUT')

// Object.assign으로 함수에 Symbol 메타데이터 부착
Object.assign(wrappedFn, {
  [CLEANUP_TIMEOUT_KEY]: timeout,
  [CLEANUP_STACK_TRACE_KEY]: stackTraceError,
})
```

### React/실무에서 어떻게 쓰여?

```typescript
// 1. React 내부 — 엘리먼트 식별
// React가 JSX를 구분할 때 Symbol을 씀
const REACT_ELEMENT_TYPE = Symbol.for('react.element')

// 2. 상태 관리 라이브러리에서 내부 키 숨기기
const STORE_KEY = Symbol('store')

function createStore(initialState) {
  return {
    [STORE_KEY]: initialState,  // 외부에서 직접 접근 방지
    getState() { return this[STORE_KEY] },
  }
}

// 3. 플러그인 시스템에서 충돌 방지
const PLUGIN_META = Symbol('pluginMeta')
function registerPlugin(plugin, meta) {
  plugin[PLUGIN_META] = meta  // 플러그인 자체 프로퍼티와 절대 충돌 안 함
}
```

### 직접 만들어보기

```typescript
// 과제: 함수 호출 횟수를 Symbol로 추적
const CALL_COUNT = Symbol('callCount')

function trackCalls<T extends (...args: any[]) => any>(fn: T): T & { [CALL_COUNT]: number } {
  // TODO: wrapper 만들고, 호출마다 [CALL_COUNT]++
  // Object.keys(wrapper)에 CALL_COUNT가 안 나오는지 확인
}
```

---

## 패턴 8: Proxy — 객체 동작 가로채기

> 중요도: ★★★☆☆ | 난이도: ★★★ | **MobX, Immer, Vue 반응성의 핵심**

### 왜 필요해?

객체의 읽기/쓰기를 가로채서 자동으로 추가 동작을 실행.

### Vitest에서 어떻게 쓰여?

**expect.poll()** — `packages/integrations/chai/poll.ts:66`

```typescript
const proxy = new Proxy(assertion, {
  get(target, key, receiver) {
    const assertionFunction = Reflect.get(target, key, receiver)

    if (typeof assertionFunction !== 'function') {
      return assertionFunction instanceof chai.Assertion ? proxy : assertionFunction
    }

    // 모든 assertion 메서드를 자동으로 폴링 로직으로 감싼다
    return function (...args) {
      // 성공할 때까지 반복 실행
    }
  },
})
```

Proxy 하나로 toBe, toEqual, toContain 등 **모든 matcher를 자동으로** 감쌈.

### React/실무에서 어떻게 쓰여?

```typescript
// 1. MobX — 상태 변경 자동 감지
const state = observable({ count: 0 })
// 내부적으로 Proxy로 set을 가로채서 자동 리렌더링

// 2. Immer — 불변 업데이트를 변경처럼 쓰기
const nextState = produce(state, draft => {
  draft.user.name = 'kim'  // Proxy가 변경을 기록 → 새 객체 생성
})

// 3. 폼 유효성 검증
function validatedForm<T extends object>(initial: T, validators: Partial<Record<keyof T, (v: any) => boolean>>) {
  return new Proxy(initial, {
    set(target, key, value) {
      const validator = validators[key as keyof T]
      if (validator && !validator(value)) {
        throw new Error(`Invalid value for ${String(key)}: ${value}`)
      }
      target[key] = value
      return true
    },
  })
}

const form = validatedForm(
  { email: '', age: 0 },
  { email: (v) => v.includes('@'), age: (v) => v > 0 }
)
form.email = 'test@test.com'  // OK
form.email = 'invalid'        // Error!

// 4. 읽기 전용 설정
function readonly<T extends object>(target: T): Readonly<T> {
  return new Proxy(target, {
    set() { throw new Error('Cannot modify readonly object') },
    deleteProperty() { throw new Error('Cannot delete from readonly object') },
  })
}
```

### 직접 만들어보기

```typescript
// 과제: 변경 감지 Proxy
function onChange<T extends object>(target: T, callback: (key: string, value: any) => void): T {
  // TODO: set을 가로채서 callback 호출
}

const state = onChange({ count: 0, name: 'kim' }, (key, value) => {
  console.log(`${key} changed to ${value}`)
})
state.count = 1   // "count changed to 1"
state.name = 'lee' // "name changed to lee"
```

---

## 패턴 9: 에러 스택 교체 — 디버깅 위치 개선

> 중요도: ★★★☆☆ | 난이도: ★★★ | **라이브러리 에러 메시지 품질의 핵심**

### 왜 필요해?

에러가 내부 코드에서 발생하지만, 사용자가 봐야 할 건 "어디서 호출했는지". 내부 스택 대신 호출 지점 스택을 보여줘야 한다.

### Vitest에서 어떻게 쓰여?

```typescript
// 1. 등록 시점에 스택 캡처 — packages/runner/src/fixture.ts
fn[FIXTURE_STACK_TRACE_KEY] = new Error('STACK_TRACE_ERROR')

// 2. 에러 시 스택 교체 — packages/integrations/chai/poll.ts:37
function copyStackTrace(target: Error, source: Error) {
  if (source.stack !== undefined) {
    target.stack = source.stack.replace(source.message, target.message)
  }
  return target
}
```

네 PR #9861이 바로 이 패턴이었지!

### React/실무에서 어떻게 쓰여?

```typescript
// 1. 커스텀 훅에서 호출 위치 추적
function useStrictState<T>(initial: T) {
  const callStack = new Error('HOOK_REGISTERED')  // 등록 시점 캡처

  const [state, setState] = useState(initial)

  const setStateStrict = (value: T) => {
    if (value === undefined) {
      const error = new Error('setState called with undefined')
      error.stack = callStack.stack  // 훅 등록 위치 보여줌
      throw error
    }
    setState(value)
  }

  return [state, setStateStrict] as const
}

// 2. API 클라이언트에서 호출 위치 추적
async function apiCall(url: string) {
  const callSite = new Error('API_CALL')  // 호출 지점 캡처

  try {
    return await fetch(url)
  } catch (error) {
    // 네트워크 에러 스택 대신 호출 지점 스택으로 교체
    error.stack = callSite.stack.replace('API_CALL', error.message)
    throw error
  }
}
```

### 직접 만들어보기

```typescript
// 과제: SafeEmitter — 에러 시 등록 시점 스택 보여주기
class SafeEmitter {
  private handlers = new Map<string, Array<{
    fn: Function
    registrationStack: Error
  }>>()

  on(event: string, fn: Function) {
    // TODO: new Error('REGISTRATION') 저장
  }

  emit(event: string, ...args: any[]) {
    // TODO: 핸들러 에러 시 registrationStack으로 교체
  }
}
```

---

## 패턴 요약표 (중요도 순)

| # | 패턴 | 실무 빈도 | 난이도 | 어디서 쓰여? |
|---|------|----------|--------|-------------|
| 1 | 고차 함수 (HOF) | 매일 | ★★☆ | React memo/lazy, 커스텀 훅, API 래퍼 |
| 2 | AbortController | 매일 | ★★☆ | useEffect cleanup, 검색 자동완성 |
| 3 | Promise 중복제거 | 자주 | ★★☆ | SWR/TanStack Query 원리, API 캐시 |
| 4 | Deferred Promise | 자주 | ★★★ | 모달 확인, WebSocket RPC |
| 5 | Lazy Init | 매일 | ★☆☆ | useMemo, React.lazy, singleton |
| 6 | WeakMap | 라이브러리 | ★★☆ | DOM 메타데이터, 캐시, cleanup |
| 7 | Symbol | 라이브러리 | ★★☆ | React 내부, 플러그인 시스템 |
| 8 | Proxy | 프레임워크 | ★★★ | MobX, Immer, Vue, 폼 검증 |
| 9 | 에러 스택 교체 | 라이브러리 | ★★★ | 에러 메시지 품질 향상 |

---

## 학습 순서

```
Week 1: 매일 쓰는 패턴
  패턴 1(HOF) → 패턴 2(AbortController) → 패턴 5(Lazy Init)

Week 2: 비동기 고급
  패턴 3(Promise 중복제거) → 패턴 4(Deferred Promise)

Week 3: 라이브러리/프레임워크 수준
  패턴 6(WeakMap) → 패턴 7(Symbol) → 패턴 8(Proxy)

Week 4: 에러 처리 고급 + 종합
  패턴 9(에러 스택 교체)
  + 위 패턴들을 조합해서 미니 테스트 러너에 적용
```

## 완전히 내 것으로 만드는 법

1. **각 패턴의 "직접 만들어보기" 과제를 전부 풀기** — 이해와 구현은 다름
2. **Vitest에서 해당 패턴이 쓰인 파일을 직접 열어서 전체 맥락 읽기**
3. **네 회사 프로젝트에서 적용할 곳 찾기** — 실전이 최고의 연습
4. **미니 테스트 러너에 이 패턴들 적용해보기** — 종합 프로젝트
