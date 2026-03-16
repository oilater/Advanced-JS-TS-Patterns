// 조건부 타입 + infer 과제

/** 과제 1: Promise를 벗기는 타입 */
export type Unwrap<T> = T extends Promise<infer U> ? U : T

/** 과제 2: 함수의 첫 번째 인자 타입 추출 */
export type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never

/** 과제 3: 깊은 Readonly */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

/** 과제 4: 깊은 Partial */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

// 런타임 과제: 타입을 활용한 함수 구현

/** 과제 5: Promise를 벗기는 함수 */
export async function unwrap<T>(value: T | Promise<T>): Promise<T> {
  throw new Error('구현해보세요!')
}

/** 과제 6: 깊은 freeze */
export function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  throw new Error('구현해보세요!')
}
