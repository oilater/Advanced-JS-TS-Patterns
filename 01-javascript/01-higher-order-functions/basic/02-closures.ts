/**
 * 기초 2: 클로저 (Closure)
 *
 * 함수가 자신이 만들어진 환경(스코프)을 "기억"하는 것.
 * 고차 함수가 작동하는 핵심 원리!
 */

// 클로저 기본
function makeCounter() {
  let count = 0 // 이 변수를 내부 함수가 "기억"함
  return function increment() {
    count++
    return count
  }
}

const counter = makeCounter()
counter() // 1
counter() // 2
counter() // 3
// count 변수는 외부에서 직접 접근 불가 — 캡슐화!

// 클로저 + 인자 = 함수 팩토리
function makeMultiplier(factor: number) {
  return (x: number) => x * factor // factor를 기억
}

const double = makeMultiplier(2)
const triple = makeMultiplier(3)
double(5) // 10
triple(5) // 15

// 클로저의 흔한 함정 — var vs let
// var는 함수 스코프라 공유됨 → 모든 클로저가 같은 값 참조
// let은 블록 스코프 → 각 반복마다 새 변수 생성

export {}
