// 기초 과제: 타입 어노테이션 + 제네릭 입문

/** 과제 1: 받은 값을 그대로 반환 (가장 간단한 제네릭) */
export function identity<T>(value: T): T {
  throw new Error('구현해보세요!')
}

/** 과제 2: 값을 배열로 감싸기 */
export function toArray<T>(value: T): T[] {
  throw new Error('구현해보세요!')
}

/** 과제 3: 두 값을 튜플로 반환 (제네릭 매개변수 2개) */
export function pair<A, B>(first: A, second: B): [A, B] {
  throw new Error('구현해보세요!')
}
