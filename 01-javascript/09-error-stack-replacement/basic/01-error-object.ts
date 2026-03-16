/**
 * 기초 1: Error 객체와 스택 트레이스
 *
 * 에러 스택 교체를 이해하려면 Error 객체의 구조를 먼저 알아야 한다.
 */

// ============================================================
// Error 객체의 구조
// ============================================================

const error = new Error('뭔가 잘못됨')

// error.message → '뭔가 잘못됨'
// error.name    → 'Error'
// error.stack   → 전체 스택 트레이스 (문자열!)

console.log(error.stack)
// 출력 예시:
// Error: 뭔가 잘못됨
//     at Object.<anonymous> (/path/to/file.ts:7:15)  ← 에러가 생성된 위치!
//     at Module._compile (node:internal/modules/cjs/loader:1376:14)
//     ...

// ============================================================
// 핵심: Error는 "생성된 위치"를 기록한다
// ============================================================

function foo() {
  return new Error('foo에서 생성')
  // stack에 "at foo (파일:줄)" 이 기록됨
}

function bar() {
  return foo()
  // foo 안에서 Error가 생성됐으니 stack에 foo가 나옴
}

const e = bar()
console.log(e.stack)
// Error: foo에서 생성
//     at foo (...)  ← 생성 위치
//     at bar (...)  ← 호출 위치
//     ...

// ============================================================
// throw vs new Error
// ============================================================

// new Error는 그냥 객체를 만드는 것 (throw 안 해도 됨)
const capturedError = new Error('CAPTURED')
// 이 시점의 스택이 기록됨. 나중에 사용 가능!

// throw는 실행 흐름을 중단하고 에러를 던지는 것
// throw new Error('THROWN')

// 에러 스택 교체 패턴의 핵심:
// 1. 미리 new Error()로 스택 캡처 (throw 없이!)
// 2. 나중에 진짜 에러 발생 시 캡처한 스택으로 교체

// ============================================================
// stack은 수정 가능한 문자열이다!
// ============================================================

const original = new Error('원래 에러')
console.log(original.stack?.split('\n')[0]) // "Error: 원래 에러"

// stack을 직접 바꿀 수 있다!
original.stack = 'Error: 교체된 스택\n    at custom (fake.ts:1:1)'
console.log(original.stack)
// "Error: 교체된 스택"
// "    at custom (fake.ts:1:1)"

// ============================================================
// 과제 1: 에러 정보 추출하기
// ============================================================

function parseError(error: Error): {
  message: string
  firstLocation: string
} {
  // TODO:
  // - error.message 추출
  // - error.stack에서 첫 번째 "at ..." 줄 추출
  throw new Error('구현해보세요!')
}

// const e = new Error('test')
// const info = parseError(e)
// info.message → 'test'
// info.firstLocation → '    at Object.<anonymous> (...)'

// ============================================================
// 과제 2: 스택 합치기
// ============================================================

function mergeStacks(error: Error, context: Error): Error {
  // TODO:
  // - error의 메시지는 유지
  // - error의 스택 아래에 context의 스택을 "--- context ---" 로 이어붙이기
  throw new Error('구현해보세요!')
}

// const error = new Error('런타임 에러')
// const context = new Error('등록 시점')
// const merged = mergeStacks(error, context)
// console.log(merged.stack)
// Error: 런타임 에러
//     at ... (런타임 위치)
// --- context ---
//     at ... (등록 위치)

export { parseError, mergeStacks }
