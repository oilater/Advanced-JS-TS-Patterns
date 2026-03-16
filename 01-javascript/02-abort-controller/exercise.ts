// AbortController 과제

/**
 * 과제 1: 취소 가능한 delay
 *
 * await cancellableDelay(1000)            // 1초 후 resolve
 * await cancellableDelay(1000, signal)    // signal abort 시 즉시 reject
 *
 * const ctrl = new AbortController()
 * setTimeout(() => ctrl.abort(), 100)
 * await cancellableDelay(5000, ctrl.signal) // 0.1초 후 reject
 */
export function cancellableDelay(ms: number, signal?: AbortSignal): Promise<void> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 타임아웃 있는 fetch 래퍼
 *
 * await fetchWithTimeout('/api/data', 3000)
 * // 3초 내에 응답 오면 Response 반환
 * // 3초 초과하면 fetch를 abort하고 reject
 */
export function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: 이전 호출을 자동 취소하는 함수 래퍼
 *
 * const search = withAutoCancel(async (signal) => {
 *   const res = await fetch(`/api/search?q=...`, { signal })
 *   return res.json()
 * })
 *
 * search()  // 첫 번째 호출 (진행 중)
 * search()  // 두 번째 호출 → 첫 번째가 자동 abort됨
 */
export function withAutoCancel<T>(
  fn: (signal: AbortSignal) => Promise<T>,
): () => Promise<T> {
  throw new Error('구현해보세요!')
}
