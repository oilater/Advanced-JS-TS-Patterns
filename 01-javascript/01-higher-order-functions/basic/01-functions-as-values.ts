/**
 * 기초 1: 함수는 값이다 (First-Class Functions)
 *
 * JavaScript에서 함수는 숫자, 문자열처럼 "값"이다.
 * 변수에 담을 수 있고, 배열에 넣을 수 있고, 인자로 전달할 수 있다.
 * 이게 고차 함수의 기반!
 */

// ============================================================
// 함수를 변수에 담기
// ============================================================

const greet = function (name: string) {
  return `안녕, ${name}!`
}

// 화살표 함수도 마찬가지
const add = (a: number, b: number) => a + b

// 함수를 다른 변수에 할당
const sum = add
console.log(sum(1, 2)) // 3

// ============================================================
// 함수를 배열에 넣기
// ============================================================

const operations = [
  (x: number) => x + 1,
  (x: number) => x * 2,
  (x: number) => x ** 2,
]

// 배열의 함수를 하나씩 꺼내서 실행
for (const op of operations) {
  console.log(op(3)) // 4, 6, 9
}

// ============================================================
// 함수를 인자로 전달 — 콜백!
// ============================================================

function doSomething(callback: (result: string) => void) {
  const result = '작업 완료'
  callback(result) // 전달받은 함수를 호출
}

doSomething((msg) => console.log(msg)) // "작업 완료"

// 이미 자주 쓰고 있음:
// [1, 2, 3].map((x) => x * 2)     ← map에 함수를 인자로 전달
// [1, 2, 3].filter((x) => x > 1)  ← filter에 함수를 인자로 전달

// ============================================================
// 과제 1: 함수를 변수에 담아서 사용하기
// ============================================================

// TODO: multiply 함수를 만들고, double에 할당
// double(5) 가 10이 되도록
function multiply(a: number, b: number): number {
  throw new Error('구현해보세요!')
}
// const double = ???

// ============================================================
// 과제 2: 함수 배열을 순서대로 실행하는 pipe
// ============================================================

function pipe(value: number, fns: Array<(x: number) => number>): number {
  // TODO: value에 fns의 함수를 순서대로 적용
  // pipe(3, [add1, double]) → double(add1(3)) → 8
  throw new Error('구현해보세요!')
}

// const add1 = (x: number) => x + 1
// const double = (x: number) => x * 2
// pipe(3, [add1, double]) → 8

export { greet, add, multiply, pipe }
