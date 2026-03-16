// Mapped Types 과제

/** 과제 1: 모든 프로퍼티를 getter 함수로 변환 */
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

/** 과제 2: 특정 타입의 프로퍼티만 추출 */
export type PickByType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K]
}

/** 과제 3: 이벤트 핸들러 타입 자동 생성 */
export type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void
}

// 런타임 과제

/** 과제 4: Getters 구현체 — 객체를 받아 getter 객체 생성 */
export function createGetters<T extends object>(obj: T): Getters<T> {
  throw new Error('구현해보세요!')
}

/** 과제 5: keyof로 안전한 필드 업데이트 (불변) */
export function updateField<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
): T {
  throw new Error('구현해보세요!')
}
