/**
 * 기초 2: 클로저 (Closure)
 *
 * 함수가 자신이 만들어진 환경(스코프)을 "기억"하는 것.
 * 고차 함수가 작동하는 핵심 원리!
 */

// ============================================================
// 클로저 기본
// ============================================================

function makeCounter() {
  let count = 0 // 이 변수를 내부 함수가 "기억"함

  return function increment() {
    count++ // 외부 함수의 count에 접근 가능!
    return count
  }
}

const counter = makeCounter()
console.log(counter()) // 1
console.log(counter()) // 2
console.log(counter()) // 3
// count 변수는 외부에서 직접 접근 불가 — 캡슐화!

// ============================================================
// 클로저 + 인자 = 함수 팩토리
// ============================================================

function makeMultiplier(factor: number) {
  // factor를 기억하는 함수를 반환
  return (x: number) => x * factor
}

const double = makeMultiplier(2)
const triple = makeMultiplier(3)

console.log(double(5)) // 10
console.log(triple(5)) // 15

// ============================================================
// 클로저의 흔한 함정 — var vs let
// ============================================================

// 문제: var는 함수 스코프라 공유됨
function badLoop() {
  const fns: Array<() => number> = []
  for (var i = 0; i < 3; i++) {
    fns.push(() => i) // 모든 함수가 같은 i를 참조!
  }
  return fns.map((fn) => fn()) // [3, 3, 3] 😢
}

// 해결: let은 블록 스코프
function goodLoop() {
  const fns: Array<() => number> = []
  for (let i = 0; i < 3; i++) {
    fns.push(() => i) // 각 반복마다 새 i
  }
  return fns.map((fn) => fn()) // [0, 1, 2] 😊
}

// ============================================================
// 과제 1: makeGreeter 만들기
// ============================================================

function makeGreeter(greeting: string) {
  // TODO: greeting을 기억하는 함수 반환
  // makeGreeter('안녕')('철수') → '안녕, 철수!'
  throw new Error('구현해보세요!')
}

// const hello = makeGreeter('안녕')
// hello('철수') // '안녕, 철수!'
// hello('영희') // '안녕, 영희!'

// ============================================================
// 과제 2: once — 한 번만 실행되는 함수
// ============================================================

function once<T extends (...args: any[]) => any>(fn: T): T {
  // TODO: fn을 한 번만 실행하고, 이후에는 첫 번째 결과를 반환
  // 힌트: 클로저로 "이미 호출됨" 상태와 결과를 기억
  throw new Error('구현해보세요!')
}

// const init = once(() => {
//   console.log('초기화!')
//   return 42
// })
// init() // "초기화!" → 42
// init() // (출력 없음) → 42

// ============================================================
// 과제 3: makeAdder 만들기
// ============================================================

function makeAdder(base: number) {
  // TODO: base에 값을 더하는 함수 반환
  throw new Error('구현해보세요!')
}

// const add10 = makeAdder(10)
// add10(5)  // 15
// add10(20) // 30

export { makeCounter, makeMultiplier, makeGreeter, once, makeAdder }
