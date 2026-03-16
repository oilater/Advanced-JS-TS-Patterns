// 기초 과제: Promise 생성자 이해

/**
 * 과제 1: resolve 함수를 외부로 노출하는 Promise
 *
 * const { promise, resolve } = manualPromise()
 * setTimeout(() => resolve('hello'), 1000)
 * await promise → 'hello' (1초 후)
 */
export function manualPromise(): {
  promise: Promise<string>
  resolve: (value: string) => void
} {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: Promise.race로 타임아웃 구현
 *
 * const fast = Promise.resolve('ok')
 * await withTimeout(fast, 1000) → 'ok'
 *
 * const slow = new Promise(r => setTimeout(r, 5000))
 * await withTimeout(slow, 100) → Error('Timeout')
 */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  throw new Error('구현해보세요!')
}
