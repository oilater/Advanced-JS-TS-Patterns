// 고차 함수 (HOF) 과제

/**
 * 과제 1: withRetry — 실패하면 최대 N번 재시도
 *
 * const fn = withRetry(async () => fetchData(), 3)
 * await fn()  // 실패 시 최대 3번 시도, 마지막도 실패하면 throw
 */
export function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  maxRetries: number,
): T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: withLogging — 호출/성공/에러를 console.log로 로깅
 *
 * const add = withLogging('add', (a, b) => a + b)
 * add(1, 2)
 * // console.log: '[add] called with [1,2]'  (형식 자유)
 * // console.log: '[add] returned 3'
 *
 * 에러 시:
 * // console.log: '[add] threw Error: ...'
 * // 그리고 에러를 다시 throw
 */
export function withLogging<T extends (...args: any[]) => any>(
  name: string,
  fn: T,
): T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: withTimeout — 제한 시간 초과 시 reject
 *
 * const fast = withTimeout(async () => 'ok', 5000)
 * await fast() → 'ok'
 *
 * const slow = withTimeout(async () => { await delay(10000) }, 100)
 * await slow() → Error (타임아웃)
 */
export function withTimeout<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ms: number,
): T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 4: compose — 함수를 오른쪽에서 왼쪽으로 합성
 *
 * const fn = compose(square, times2, add1)
 * fn(3) → square(times2(add1(3))) → square(times2(4)) → square(8) → 64
 *
 * compose()  → identity (인자 그대로 반환)
 */
export function compose<T>(
  ...fns: Array<(arg: T) => T>
): (arg: T) => T {
  throw new Error('구현해보세요!')
}
