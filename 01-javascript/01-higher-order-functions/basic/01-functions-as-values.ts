/**
 * 기초 1: 함수는 값이다 (First-Class Functions)
 *
 * JavaScript에서 함수는 숫자, 문자열처럼 "값"이다.
 * 변수에 담을 수 있고, 배열에 넣을 수 있고, 인자로 전달할 수 있다.
 * 이게 고차 함수의 기반!
 */

// 함수를 변수에 담기
const greet = function (name: string) {
  return `안녕, ${name}!`
}

// 화살표 함수도 마찬가지
const add = (a: number, b: number) => a + b

// 함수를 다른 변수에 할당
const sum = add
sum(1, 2) // 3

// 함수를 배열에 넣기
const operations = [
  (x: number) => x + 1,
  (x: number) => x * 2,
  (x: number) => x ** 2,
]
operations.forEach((op) => op(3)) // 4, 6, 9

// 함수를 인자로 전달 — 콜백!
function doSomething(callback: (result: string) => void) {
  callback('작업 완료')
}

// 이미 매일 쓰고 있음:
// [1, 2, 3].map((x) => x * 2)
// [1, 2, 3].filter((x) => x > 1)
// setTimeout(() => console.log('hi'), 1000)

export {}
