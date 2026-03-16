/**
 * TS 패턴 7: Mapped Types — 타입을 변환하는 반복문
 * 난이도: ★★★
 *
 * 객체 타입의 모든 키를 순회하면서 변환하는 패턴.
 * for...in의 타입 버전.
 */

// ============================================================
// 기본
// ============================================================

// 모든 프로퍼티를 optional로
type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

// 모든 프로퍼티를 readonly로
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

// ============================================================
// 키 필터링 (as + never)
// ============================================================

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

// ============================================================
// Vitest 실제 코드
// ============================================================

type Procedure = (...args: any[]) => any

// 함수 키만 추출 — packages/spy/src/types.ts:185
// vi.spyOn(obj, 'methodName')에서 methodName이 실제 메서드인지 보장
type Methods<T> = keyof {
  [K in keyof T as T[K] extends Procedure ? K : never]: T[K]
}

// 함수가 아닌 프로퍼티만 추출
type Properties<T> = {
  [K in keyof T]: T[K] extends Procedure ? never : K
}[keyof T] &
  (string | symbol)

// 생성자만 추출
type Classes<T> = {
  [K in keyof T]: T[K] extends new (...args: any[]) => any ? K : never
}[keyof T] &
  (string | symbol)

export type { MyPartial, MyReadonly, MethodsOnly, Methods, Properties, Classes }
