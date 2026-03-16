// Symbol 과제

export const CALL_COUNT = Symbol('callCount')

/**
 * 과제 1: 함수 호출 횟수를 Symbol로 추적
 *
 * const add = trackCalls((a, b) => a + b)
 * add(1, 2)          → 3
 * add(3, 4)          → 7
 * add[CALL_COUNT]    → 2
 * Object.keys(add)   → []  (Symbol은 안 보임!)
 */
export function trackCalls<T extends (...args: any[]) => any>(
  fn: T,
): T & { [CALL_COUNT]: number } {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: Symbol.iterator 구현 — for...of 순회 가능한 Range
 *
 * [...new NumberRange(1, 5)]   → [1, 2, 3, 4, 5]
 * [...new NumberRange(3, 3)]   → [3]
 * for (const n of new NumberRange(1, 3)) { ... }  // 1, 2, 3
 */
export class NumberRange {
  constructor(
    public start: number,
    public end: number,
  ) {}

  [Symbol.iterator](): Iterator<number> {
    throw new Error('구현해보세요!')
  }
}

/**
 * 과제 3: Symbol.for로 객체에 플래그 부착 (JSON에 안 나옴)
 *
 * const obj = { name: 'kim' }
 * isValidated(obj)       → false
 * markAsValidated(obj)
 * isValidated(obj)       → true
 * JSON.stringify(obj)    → '{"name":"kim"}'  (플래그 안 보임)
 */
export const IS_VALIDATED = Symbol.for('IS_VALIDATED')

export function markAsValidated(obj: any): void {
  throw new Error('구현해보세요!')
}

export function isValidated(obj: any): boolean {
  throw new Error('구현해보세요!')
}
