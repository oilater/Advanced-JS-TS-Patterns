// 조건부 타입 + infer 과제

/** 타입 레벨 과제 (컴파일만 되면 통과) */
export type Unwrap<T> = T extends Promise<infer U> ? U : T
export type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

/**
 * 과제 1: Promise든 일반 값이든 벗겨서 반환
 *
 * await unwrap(Promise.resolve(42)) → 42
 * await unwrap(42)                  → 42
 * await unwrap('hello')             → 'hello'
 */
export async function unwrap<T>(value: T | Promise<T>): Promise<T> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 깊은 freeze — 중첩 객체도 변경 불가
 *
 * const obj = deepFreeze({ a: 1, b: { c: 2 } })
 * obj.a = 99        → Error!
 * obj.b.c = 99      → Error!
 * 힌트: Object.freeze는 1단계만 동결. 재귀 필요.
 */
export function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  throw new Error('구현해보세요!')
}
