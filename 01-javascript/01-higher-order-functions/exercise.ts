// 고차 함수 (HOF) 과제

/** 과제 1: withRetry — 실패하면 최대 N번 재시도 */
export function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  maxRetries: number,
): T {
  throw new Error('구현해보세요!')
}

/** 과제 2: withLogging — 호출/성공/에러 로깅 */
export function withLogging<T extends (...args: any[]) => any>(
  name: string,
  fn: T,
): T {
  // 호출 시: '[name] called with [args]'
  // 성공 시: '[name] returned [result]'
  // 에러 시: '[name] threw [error.message]'
  throw new Error('구현해보세요!')
}

/** 과제 3: withTimeout — 제한 시간 초과 시 reject */
export function withTimeout<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ms: number,
): T {
  throw new Error('구현해보세요!')
}

/** 과제 4: compose — 함수를 오른쪽에서 왼쪽으로 합성 */
export function compose<T>(
  ...fns: Array<(arg: T) => T>
): (arg: T) => T {
  // compose(f, g, h)(x) === f(g(h(x)))
  throw new Error('구현해보세요!')
}
