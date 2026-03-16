/**
 * Symbol — 직접 만들어보기
 *
 * 목표: Symbol을 사용한 메타데이터 관리 패턴을 구현한다.
 */

// ============================================================
// 과제 1: 함수 호출 횟수를 Symbol로 추적
// ============================================================

const CALL_COUNT = Symbol('callCount')

function trackCalls<T extends (...args: any[]) => any>(
  fn: T,
): T & { [CALL_COUNT]: number } {
  // TODO:
  // - wrapper 함수를 만들고
  // - 호출마다 [CALL_COUNT]를 1 증가
  // - Object.keys(wrapper)에 CALL_COUNT가 안 나오는지 확인
  throw new Error('구현해보세요!')
}

// 테스트:
// const add = trackCalls((a: number, b: number) => a + b)
// add(1, 2) // 3
// add(3, 4) // 7
// console.log(add[CALL_COUNT]) // 2
// console.log(Object.keys(add)) // [] — Symbol은 안 보임!

// ============================================================
// 과제 2: Symbol.for를 사용한 크로스 모듈 플래그
// ============================================================

const IS_VALIDATED = Symbol.for('MY_LIB_IS_VALIDATED')

function markAsValidated(obj: any): void {
  // TODO: obj에 IS_VALIDATED 플래그 설정
  throw new Error('구현해보세요!')
}

function isValidated(obj: any): boolean {
  // TODO: IS_VALIDATED 플래그 확인
  throw new Error('구현해보세요!')
}

// 테스트:
// const data = { name: 'kim', email: 'kim@test.com' }
// console.log(isValidated(data)) // false
// markAsValidated(data)
// console.log(isValidated(data)) // true
// console.log(JSON.stringify(data)) // '{"name":"kim","email":"kim@test.com"}' — 플래그 안 보임

// ============================================================
// 과제 3: Symbol.iterator 커스텀 구현
// ============================================================

class NumberRange {
  constructor(
    private start: number,
    private end: number,
  ) {}

  // TODO: Symbol.iterator를 구현해서 for...of 가능하게
  [Symbol.iterator](): Iterator<number> {
    throw new Error('구현해보세요!')
  }
}

// 테스트:
// const range = new NumberRange(1, 5)
// for (const n of range) {
//   console.log(n) // 1, 2, 3, 4, 5
// }
// console.log([...range]) // [1, 2, 3, 4, 5]

export { CALL_COUNT, trackCalls, markAsValidated, isValidated, NumberRange }
