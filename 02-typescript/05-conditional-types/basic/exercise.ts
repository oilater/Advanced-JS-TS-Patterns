// 기초 과제: extends 키워드 이해

/**
 * 과제 1: 문자열 길이 반환 (T extends string 제약)
 *
 * printLength('hello') → 5
 * printLength('')      → 0
 */
export function printLength<T extends string>(value: T): number {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 객체의 키를 배열로 반환 (T extends object 제약)
 *
 * getKeys({ a: 1, b: 2 }) → ['a', 'b']
 * getKeys({})              → []
 */
export function getKeys<T extends object>(obj: T): string[] {
  throw new Error('구현해보세요!')
}
