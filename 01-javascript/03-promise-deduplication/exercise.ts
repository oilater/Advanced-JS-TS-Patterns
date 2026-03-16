/**
 * Promise 중복 제거 — 직접 만들어보기
 *
 * 목표: 같은 key로 동시 호출 시 하나만 실행되는 패턴을 구현한다.
 */

// ============================================================
// 과제 1: 범용 dedupe 래퍼
// ============================================================

function dedupe<T>(fn: (key: string) => Promise<T>): (key: string) => Promise<T> {
  // TODO: 같은 key로 동시 호출 시 하나만 실행
  // 힌트: Map<string, Promise<T>> 사용, finally에서 삭제
  throw new Error('구현해보세요!')
}

// 테스트:
// const fetchUser = dedupe(async (id: string) => {
//   console.log(`fetching ${id}...`)
//   await new Promise(r => setTimeout(r, 100))
//   return { id, name: 'kim' }
// })
//
// const [a, b, c] = await Promise.all([
//   fetchUser('1'),  // "fetching 1..." (실행)
//   fetchUser('1'),  // (공유 — 로그 안 나옴)
//   fetchUser('2'),  // "fetching 2..." (다른 key니까 실행)
// ])
// console.log(a === b) // true — 같은 Promise의 결과

// ============================================================
// 과제 2: TTL(Time To Live)이 있는 캐시
// ============================================================

function dedupeWithTTL<T>(
  fn: (key: string) => Promise<T>,
  ttlMs: number,
): (key: string) => Promise<T> {
  // TODO:
  // - 같은 key로 호출 시 캐시된 결과 반환
  // - ttlMs 밀리초가 지나면 캐시 만료 → 다시 요청
  // 힌트: Map에 { promise, timestamp } 저장
  throw new Error('구현해보세요!')
}

// 테스트:
// const fetchData = dedupeWithTTL(async (id) => {
//   console.log(`fetching ${id}`)
//   return { id }
// }, 1000)
//
// await fetchData('1') // "fetching 1" (실행)
// await fetchData('1') // (캐시에서 — 1초 이내)
// await new Promise(r => setTimeout(r, 1500))
// await fetchData('1') // "fetching 1" (캐시 만료 → 다시 실행)

// ============================================================
// 과제 3: 에러 시 캐시 안 하는 dedupe
// ============================================================

function dedupeNoErrorCache<T>(
  fn: (key: string) => Promise<T>,
): (key: string) => Promise<T> {
  // TODO:
  // - 성공하면 진행 중인 요청 공유 (기본 dedupe)
  // - 실패하면 즉시 Map에서 제거 (다음 호출은 새로 요청)
  throw new Error('구현해보세요!')
}

export { dedupe, dedupeWithTTL, dedupeNoErrorCache }
