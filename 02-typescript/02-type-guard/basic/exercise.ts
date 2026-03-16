// 기초 과제: 유니온 타입과 타입 좁히기

/**
 * 과제 1: typeof로 안전하게 포매팅
 *
 * formatValue('hello')  → 'HELLO'
 * formatValue(3.14159)  → '3.14'
 * formatValue(true)     → 'Yes'
 * formatValue(false)    → 'No'
 */
export function formatValue(value: string | number | boolean): string {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 배열인지 확인 후 합산
 *
 * total(5)          → 5
 * total([1, 2, 3])  → 6
 * total([])         → 0
 * 힌트: Array.isArray()
 */
export function total(input: number | number[]): number {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: null-safe 길이 반환
 *
 * getLength('hello')   → 5
 * getLength(null)      → 0
 * getLength(undefined) → 0
 */
export function getLength(value: string | null | undefined): number {
  throw new Error('구현해보세요!')
}
