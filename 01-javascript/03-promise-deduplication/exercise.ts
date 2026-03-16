// Promise 중복 제거 과제

/** 과제 1: 같은 key 동시 호출 시 하나만 실행하는 dedupe 래퍼 */
export function dedupe<T>(
  fn: (key: string) => Promise<T>,
): (key: string) => Promise<T> {
  // 같은 key → 진행 중인 Promise 공유
  // 완료 후 → Map에서 삭제 (다음 호출은 새로 실행)
  throw new Error('구현해보세요!')
}

/** 과제 2: TTL 캐시가 있는 dedupe */
export function dedupeWithTTL<T>(
  fn: (key: string) => Promise<T>,
  ttlMs: number,
): (key: string) => Promise<T> {
  // 완료 후에도 ttlMs 동안 캐시 유지
  // ttlMs 지나면 다시 실행
  throw new Error('구현해보세요!')
}

/** 과제 3: 에러 시 캐시하지 않는 dedupe */
export function dedupeNoErrorCache<T>(
  fn: (key: string) => Promise<T>,
): (key: string) => Promise<T> {
  // 성공: 진행 중인 요청 공유 (기본 dedupe)
  // 실패: 즉시 Map에서 삭제 → 다음 호출은 재시도
  throw new Error('구현해보세요!')
}
