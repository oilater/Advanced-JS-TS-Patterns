// 기초 과제: 타입 어노테이션 + 제네릭 입문

/**
 * 과제 1: 받은 값을 그대로 반환 (가장 간단한 제네릭)
 *
 * identity(42)      → 42       (타입: number)
 * identity('hello') → 'hello'  (타입: string)
 */
export function identity<T>(value: T): T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 값을 배열로 감싸기
 *
 * toArray(1)       → [1]       (타입: number[])
 * toArray('hello') → ['hello'] (타입: string[])
 */
export function toArray<T>(value: T): T[] {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: 두 값을 튜플로 반환 (제네릭 매개변수 2개)
 *
 * pair(1, 'hello') → [1, 'hello']  (타입: [number, string])
 * pair('a', true)  → ['a', true]   (타입: [string, boolean])
 */
export function pair<A, B>(first: A, second: B): [A, B] {
  throw new Error('구현해보세요!')
}
