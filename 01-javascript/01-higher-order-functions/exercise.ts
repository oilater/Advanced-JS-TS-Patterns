/**
 * 고차 함수 (HOF) — 직접 만들어보기
 *
 * 목표: 함수를 감싸서 기능을 추가하는 패턴을 직접 구현한다.
 */

// ============================================================
// 과제 1: withRetry — 실패하면 N번 재시도
// ============================================================

function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  maxRetries: number,
): T {
  // TODO: 실패하면 maxRetries번까지 재시도
  // 힌트: for 루프 + try/catch
  throw new Error('구현해보세요!')
}

// 테스트:
// let attempt = 0
// const flaky = withRetry(async () => {
//   attempt++
//   if (attempt < 3) throw new Error('fail')
//   return 'success'
// }, 3)
// console.log(await flaky()) // 'success' (3번째에 성공)

// ============================================================
// 과제 2: withLogging — 호출/완료/에러 로깅
// ============================================================

function withLogging<T extends (...args: any[]) => any>(name: string, fn: T): T {
  // TODO:
  // - 호출 시: console.log(`[${name}] called with`, args)
  // - 성공 시: console.log(`[${name}] returned`, result)
  // - 에러 시: console.log(`[${name}] threw`, error)
  throw new Error('구현해보세요!')
}

// 테스트:
// const add = withLogging('add', (a: number, b: number) => a + b)
// add(1, 2)
// // "[add] called with [1, 2]"
// // "[add] returned 3"

// ============================================================
// 과제 3: withThrottle — 일정 시간 내 1번만 실행
// ============================================================

function withThrottle<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  // TODO: ms 밀리초 내에 여러 번 호출해도 첫 번째만 실행
  // 힌트: lastCall 시간 기록
  throw new Error('구현해보세요!')
}

// 테스트:
// const throttled = withThrottle((x: number) => console.log(x), 1000)
// throttled(1) // 실행
// throttled(2) // 무시 (1초 안)
// setTimeout(() => throttled(3), 1500) // 실행

// ============================================================
// 과제 4: 조합 — 여러 HOF를 합쳐보기
// ============================================================

// const fetchData = withLogging('fetchData',
//   withRetry(async (url: string) => {
//     const res = await fetch(url)
//     if (!res.ok) throw new Error(`HTTP ${res.status}`)
//     return res.json()
//   }, 3)
// )

export { withRetry, withLogging, withThrottle }
