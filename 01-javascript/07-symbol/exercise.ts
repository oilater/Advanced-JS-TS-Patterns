// Symbol 과제

export const CALL_COUNT = Symbol('callCount')

/** 과제 1: 함수 호출 횟수를 Symbol로 추적 (Object.keys에 안 보여야 함) */
export function trackCalls<T extends (...args: any[]) => any>(
  fn: T,
): T & { [CALL_COUNT]: number } {
  throw new Error('구현해보세요!')
}

/** 과제 2: Symbol.iterator를 구현해서 for...of 가능한 Range */
export class NumberRange {
  constructor(
    public start: number,
    public end: number,
  ) {}

  [Symbol.iterator](): Iterator<number> {
    throw new Error('구현해보세요!')
  }
}

/** 과제 3: Symbol.for로 크로스 모듈 플래그 */
export const IS_VALIDATED = Symbol.for('IS_VALIDATED')

export function markAsValidated(obj: any): void {
  throw new Error('구현해보세요!')
}

export function isValidated(obj: any): boolean {
  throw new Error('구현해보세요!')
}
