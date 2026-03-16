/**
 * 기초 3: 함수를 반환하는 함수
 *
 * "함수를 값으로 다루기" + "클로저"를 합치면
 * → 함수를 반환하는 함수 = 고차 함수의 핵심!
 *
 * 이걸 이해하면 withTimeout, withRetry 같은 패턴이 자연스럽게 읽힌다.
 */

// ============================================================
// 단계별 이해
// ============================================================

// Step 1: 평범한 함수
function add(a: number, b: number) {
  return a + b
}

// Step 2: 함수를 반환하는 함수 (수동 래핑)
function makeLoggedAdd() {
  return (a: number, b: number) => {
    console.log(`add(${a}, ${b})`)
    return a + b
  }
}
const loggedAdd = makeLoggedAdd()
loggedAdd(1, 2) // "add(1, 2)" → 3

// Step 3: 아무 함수나 감쌀 수 있게 일반화 = HOF!
function withLog<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: any[]) => {
    console.log(`호출: ${fn.name}(${args.join(', ')})`)
    const result = fn(...args)
    console.log(`결과: ${result}`)
    return result
  }) as T
}

const loggedAdd2 = withLog(add)
loggedAdd2(1, 2)
// "호출: add(1, 2)"
// "결과: 3"

// ============================================================
// 실생활 비유
// ============================================================

// withLog(fn) 은 "투명 포장지" 같은 것
// 원래 함수(선물)는 그대로인데, 감싸서 추가 기능(리본, 카드)을 붙임
//
// withTimeout(fn)  → "시간 제한 포장지"
// withRetry(fn)    → "재시도 포장지"
// withAuth(fn)     → "인증 포장지"
// withCache(fn)    → "캐시 포장지"

// ============================================================
// 과제 1: withDelay — 함수 실행을 ms만큼 지연
// ============================================================

function withDelay<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  // TODO: ms 밀리초 후에 fn을 실행하는 새 함수 반환
  // 힌트: setTimeout + Promise
  throw new Error('구현해보세요!')
}

// const delayedLog = withDelay(console.log, 1000)
// delayedLog('hello') // 1초 후 "hello"

// ============================================================
// 과제 2: withCount — 호출 횟수 추적
// ============================================================

function withCount<T extends (...args: any[]) => any>(
  fn: T,
): T & { count: number } {
  // TODO: fn을 감싸서 호출 횟수를 .count에 기록
  // 힌트: 클로저로 count 유지, wrapper 함수에 count 프로퍼티 추가
  throw new Error('구현해보세요!')
}

// const counted = withCount((x: number) => x * 2)
// counted(3)  // 6
// counted(5)  // 10
// console.log(counted.count)  // 2

// ============================================================
// 과제 3: withDefault — 기본값이 있는 함수
// ============================================================

function withDefault<T extends (...args: any[]) => any>(
  fn: T,
  defaultArgs: Parameters<T>,
): T {
  // TODO: 인자가 없으면 defaultArgs 사용
  throw new Error('구현해보세요!')
}

// const greet = (name: string, greeting: string) => `${greeting}, ${name}!`
// const greetDefault = withDefault(greet, ['World', 'Hello'])
// greetDefault()              // "Hello, World!"
// greetDefault('Kim', 'Hi')  // "Hi, Kim!"

export { withLog, withDelay, withCount, withDefault }
