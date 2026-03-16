// Promise 중복 제거 과제

/**
 * 과제 1: 같은 key 동시 호출 시 하나만 실행하는 dedupe 래퍼
 *
 * const fetchUser = dedupe(async (id) => fetch(`/api/users/${id}`))
 *
 * // 동시 호출 → fn은 1번만 실행, 결과 공유
 * const [a, b] = await Promise.all([fetchUser('1'), fetchUser('1')])
 *
 * // 완료 후 다시 호출 → 새로 실행
 * const c = await fetchUser('1')
 */
export function dedupe<T>(
  fn: (key: string) => Promise<T>,
): (key: string) => Promise<T> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: TTL 캐시가 있는 dedupe
 *
 * const fn = dedupeWithTTL(fetchUser, 1000)
 * await fn('1')              // 실행
 * await fn('1')              // 캐시에서 (1초 이내)
 * // 1초 후...
 * await fn('1')              // 캐시 만료 → 새로 실행
 */
export function dedupeWithTTL<T>(
  fn: (key: string) => Promise<T>,
  ttlMs: number,
): (key: string) => Promise<T> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: 에러 시 캐시하지 않는 dedupe
 *
 * const fn = dedupeNoErrorCache(fetchUser)
 * await fn('1')   // 실패 → Map에서 즉시 삭제
 * await fn('1')   // 재시도 (새로 실행)
 */
export function dedupeNoErrorCache<T>(
  fn: (key: string) => Promise<T>,
): (key: string) => Promise<T> {
  throw new Error('구현해보세요!')
}
