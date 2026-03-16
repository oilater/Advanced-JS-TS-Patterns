/**
 * 기초 3: 함수를 반환하는 함수
 *
 * "함수를 값으로 다루기" + "클로저"를 합치면
 * → 함수를 반환하는 함수 = 고차 함수의 핵심!
 *
 * 실생활 비유:
 * withXxx(fn) 은 "투명 포장지" 같은 것.
 * 원래 함수(선물)는 그대로인데, 감싸서 추가 기능(리본, 카드)을 붙임.
 *
 * withTimeout(fn)  → "시간 제한 포장지"
 * withRetry(fn)    → "재시도 포장지"
 * withAuth(fn)     → "인증 포장지"
 */

// Step 1: 평범한 함수
function add(a: number, b: number) {
  return a + b
}

// Step 2: 아무 함수나 감싸서 로깅을 추가하는 HOF
function withLog<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: any[]) => {
    console.log(`호출: ${fn.name}(${args.join(', ')})`)
    const result = fn(...args)
    console.log(`결과: ${result}`)
    return result
  }) as T
}

const loggedAdd = withLog(add)
loggedAdd(1, 2)
// "호출: add(1, 2)"
// "결과: 3"

export {}
