/**
 * TS 패턴 1: Generic — 타입을 변수처럼 쓰기
 * 난이도: ★★☆
 *
 * 함수가 "어떤 타입이든" 받을 수 있으면서도,
 * 입력과 출력의 타입 관계를 유지하는 방법.
 *
 * <T>는 "여기에 타입이 들어올 거야"라는 자리표시자.
 * 호출할 때 TypeScript가 자동으로 추론해줌.
 */

// ============================================================
// 기본: 제네릭 없이 vs 있으면
// ============================================================

// 제네릭 없이 — 타입 정보가 사라짐
function firstBad(arr: any[]): any {
  return arr[0]
}
const x1 = firstBad([1, 2, 3]) // x1: any 😢

// 제네릭 — 타입이 유지됨
function first<T>(arr: T[]): T {
  return arr[0]
}
const x2 = first([1, 2, 3]) // x2: number 😊
const x3 = first(['a', 'b']) // x3: string 😊

// ============================================================
// 제약 조건 (extends)
// ============================================================

// T는 아무거나 다 되는 게 아니라, "함수"여야 한다고 제한
function callIt<T extends (...args: any[]) => any>(fn: T): ReturnType<T> {
  return fn()
}

callIt(() => 42) // OK — 함수니까
// callIt("hello")   // Error — 문자열은 함수가 아님

// ============================================================
// Vitest 실제 코드: withTimeout
// packages/runner/src/context.ts:40
// ============================================================

/**
 * 제네릭이 왜 필요한지의 핵심 예제!
 *
 * 제네릭 없이 하면:
 *   function withTimeout(fn: Function): Function
 *   → wrapped('kim', 25) // Error! 인자 타입을 모름
 *
 * 제네릭 있으면:
 *   function withTimeout<T extends (...args: any[]) => any>(fn: T): T
 *   → wrapped('kim', 25) // OK! 원래 함수 시그니처 유지됨
 */
function withTimeout<T extends (...args: any[]) => any>(
  fn: T,
  timeout: number,
): T {
  return (function runWithTimeout(...args: any[]) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Timeout')), timeout)
      try {
        const result = fn(...args)
        if (result?.then) result.then(resolve, reject)
        else {
          clearTimeout(timer)
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    })
  }) as T
}

export { first, callIt, withTimeout }
