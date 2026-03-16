// 함수 오버로드 과제

/** 과제 1: parse — string이면 number, number면 string 반환 */
export function parse(input: string): number
export function parse(input: number): string
export function parse(input: string | number): number | string {
  throw new Error('구현해보세요!')
}

/** 과제 2: wrap — 배열이면 그대로, 아니면 배열로 감싸기 */
export function wrap<T>(value: T[]): T[]
export function wrap<T>(value: T): T[]
export function wrap<T>(value: T | T[]): T[] {
  throw new Error('구현해보세요!')
}
