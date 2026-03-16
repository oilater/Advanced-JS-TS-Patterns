// 함수 오버로드 과제

/**
 * 과제 1: string → number, number → string 변환
 *
 * parse('42')  → 42      (반환 타입: number)
 * parse(42)    → '42'    (반환 타입: string)
 */
export function parse(input: string): number
export function parse(input: number): string
export function parse(input: string | number): number | string {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 배열이면 그대로, 아니면 배열로 감싸기
 *
 * wrap(1)      → [1]
 * wrap([1, 2]) → [1, 2]  (그대로)
 * wrap('a')    → ['a']
 */
export function wrap<T>(value: T[]): T[]
export function wrap<T>(value: T): T[]
export function wrap<T>(value: T | T[]): T[] {
  throw new Error('구현해보세요!')
}
