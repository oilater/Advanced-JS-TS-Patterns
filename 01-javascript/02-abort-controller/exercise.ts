/**
 * AbortController — 직접 만들어보기
 *
 * 목표: 취소 가능한 비동기 작업을 직접 구현한다.
 */

// ============================================================
// 과제 1: 취소 가능한 delay
// ============================================================

function cancellableDelay(ms: number, signal?: AbortSignal): Promise<void> {
  // TODO:
  // - ms 밀리초 후에 resolve
  // - signal이 abort되면 즉시 reject
  // - abort 시 setTimeout도 정리 (clearTimeout)
  throw new Error('구현해보세요!')
}

// 테스트:
// const controller = new AbortController()
// setTimeout(() => controller.abort(), 500)
// try {
//   await cancellableDelay(2000, controller.signal) // 0.5초 후 abort
// } catch (e) {
//   console.log('취소됨!') // 이게 출력되어야 함
// }

// ============================================================
// 과제 2: 취소 가능한 fetch 래퍼
// ============================================================

function createFetchWithAbort() {
  // TODO:
  // - fetch를 호출하면서 AbortController를 자동 생성
  // - { promise, abort } 를 반환
  // - abort()를 호출하면 fetch가 취소됨
  throw new Error('구현해보세요!')
}

// 테스트:
// const { promise, abort } = createFetchWithAbort('/api/slow-endpoint')
// setTimeout(() => abort(), 1000) // 1초 후 취소
// try {
//   const data = await promise
// } catch (e) {
//   console.log('요청 취소됨')
// }

// ============================================================
// 과제 3: 여러 비동기 작업을 하나의 signal로 취소
// ============================================================

async function fetchAll(
  urls: string[],
  signal?: AbortSignal,
): Promise<Response[]> {
  // TODO:
  // - 모든 url을 병렬로 fetch
  // - signal이 abort되면 모든 요청 취소
  // - 힌트: Promise.all + signal 전달
  throw new Error('구현해보세요!')
}

// 테스트:
// const controller = new AbortController()
// const results = await fetchAll(
//   ['/api/a', '/api/b', '/api/c'],
//   controller.signal,
// )

export { cancellableDelay, createFetchWithAbort, fetchAll }
