// Mapped Types 과제

/** 타입 레벨 과제 (컴파일만 되면 통과) */

// name → getName, age → getAge 형태
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

// 값이 ValueType인 프로퍼티만 남기기
export type PickByType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K]
}

// 각 키에 대해 on + 대문자 시작 핸들러 생성
export type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void
}

/**
 * 과제 1: 객체를 받아 getter 객체 생성
 *
 * createGetters({ name: 'kim', age: 25 })
 * → { getName: () => 'kim', getAge: () => 25 }
 *
 * createGetters({}) → {}
 */
export function createGetters<T extends object>(obj: T): Getters<T> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 특정 필드만 업데이트 (불변)
 *
 * updateField({ name: 'kim', age: 25 }, 'name', 'lee')
 * → { name: 'lee', age: 25 }
 */
export function updateField<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
): T {
  throw new Error('구현해보세요!')
}
