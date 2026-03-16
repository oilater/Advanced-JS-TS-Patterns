// 기초 과제: Promise 생성자 이해

/** 과제 1: resolve 함수를 외부로 노출하는 Promise */
export function manualPromise(): {
  promise: Promise<string>
  resolve: (value: string) => void
} {
  throw new Error('구현해보세요!')
}

/** 과제 2: Promise.race로 타임아웃 구현 */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  throw new Error('구현해보세요!')
}
