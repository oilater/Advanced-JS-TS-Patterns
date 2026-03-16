/**
 * 조건부 타입 + infer — 직접 만들어보기
 */

// ============================================================
// 과제 1: Promise를 벗기는 타입
// ============================================================

type Unwrap<T> = T extends Promise<infer U> ? U : T

type Test1 = Unwrap<Promise<string>> // string
type Test2 = Unwrap<number> // number

// ============================================================
// 과제 2: 함수의 첫 번째 인자 타입 추출
// ============================================================

type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never

type Test3 = FirstArg<(name: string, age: number) => void> // string

// ============================================================
// 과제 3: 깊은 Readonly (재귀)
// ============================================================

type DeepReadonly<T> = {
  // TODO: T가 객체면 각 필드를 재귀적으로 Readonly
  // 원시값이면 그대로
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

type Test4 = DeepReadonly<{ a: { b: { c: number } } }>
// → { readonly a: { readonly b: { readonly c: number } } }

// ============================================================
// 과제 4: 깊은 Partial (재귀)
// ============================================================

type DeepPartial<T> = {
  // TODO: 모든 필드를 재귀적으로 optional로
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type Test5 = DeepPartial<{ a: { b: number; c: string } }>
// → { a?: { b?: number; c?: string } }

export type { Unwrap, FirstArg, DeepReadonly, DeepPartial }
