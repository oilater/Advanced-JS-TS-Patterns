// AbortController 과제

/** 과제 1: 취소 가능한 delay */
export function cancellableDelay(ms: number, signal?: AbortSignal): Promise<void> {
  // signal이 abort되면 즉시 reject, setTimeout도 정리
  throw new Error('구현해보세요!')
}

/** 과제 2: 타임아웃 있는 fetch 래퍼 */
export function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  // ms 내에 fetch 안 끝나면 abort
  throw new Error('구현해보세요!')
}

/** 과제 3: 이전 호출을 자동 취소하는 함수 래퍼 */
export function withAutoCancel<T>(
  fn: (signal: AbortSignal) => Promise<T>,
): () => Promise<T> {
  // 새 호출 시 이전 호출을 abort하고 새로 실행
  throw new Error('구현해보세요!')
}
