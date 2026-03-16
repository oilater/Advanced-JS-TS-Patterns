/**
 * TS 패턴 5: 조건부 타입 (Conditional Types) — 타입 레벨 if/else
 * 난이도: ★★★
 *
 * T extends X ? A : B  →  타입 레벨 if/else
 * infer  →  "이 자리에 있는 타입을 변수에 담아줘"
 */

// ============================================================
// 기본
// ============================================================

type IsString<T> = T extends string ? 'yes' : 'no'

type A = IsString<string> // 'yes'
type B = IsString<number> // 'no'
type C = IsString<'hello'> // 'yes' — 'hello'는 string의 하위 타입

// infer — 타입에서 값 추출하기
type Unpack<T> = T extends Array<infer U> ? U : T

type D = Unpack<string[]> // string
type E = Unpack<number> // number

// ============================================================
// Vitest 실제 코드
// ============================================================

// 1. 재귀적 깊은 매칭 — packages/expect/src/types.ts:211
// expect({ a: [1, 2] }).toEqual(...)에서
// 깊은 중첩 구조에서도 expect.any(Number) 같은 matcher를 쓸 수 있게

// type DeeplyAllowMatchers<T> =
//   T extends Array<infer Element>
//     ? T | DeeplyAllowMatchers<Element>[]  // 배열이면 재귀
//     : T extends object
//       ? T | { [K in keyof T]: DeeplyAllowMatchers<T[K]> }  // 객체면 각 필드 재귀
//       : T  // 원시값이면 끝

// 2. 함수를 Promise로 변환 — packages/expect/src/types.ts:632
type Promisify<O> = {
  [K in keyof O]: O[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R> // 함수면 반환값을 Promise로
    : O[K] // 함수 아니면 그대로
}

// 3. Mock 파라미터 추출 — packages/spy/src/types.ts:44
type Procedure = (...args: any[]) => any
type Constructable = new (...args: any[]) => any

type MockParameters<T extends Procedure | Constructable> = T extends Constructable
  ? ConstructorParameters<T>
  : T extends Procedure
    ? Parameters<T>
    : never

// ============================================================
// 핵심 규칙
// ============================================================

// T extends X ? A : B           → 타입 레벨 if/else
// T extends Array<infer U>      → 배열에서 요소 타입 추출
// T extends (...args: infer A) => infer R → 함수에서 인자/반환 타입 추출

export type { IsString, Unpack, Promisify, MockParameters }
