/**
 * 기초 1: 타입 어노테이션 기본
 *
 * Generic을 이해하려면 TypeScript의 기본 타입 시스템을 먼저 알아야 한다.
 */

// ============================================================
// 기본 타입
// ============================================================

const name1: string = 'kim'
const age: number = 25
const isStudent: boolean = true
const hobbies: string[] = ['coding', 'reading']

// ============================================================
// 함수 타입
// ============================================================

// 매개변수와 반환값에 타입 지정
function add(a: number, b: number): number {
  return a + b
}

// 화살표 함수
const multiply = (a: number, b: number): number => a * b

// 함수 타입 자체를 변수에
const operation: (a: number, b: number) => number = add

// ============================================================
// 타입이 왜 필요한가 — 없으면 생기는 문제
// ============================================================

// any를 쓰면 타입 체크가 안 됨
function badFirst(arr: any[]): any {
  return arr[0]
}
const x = badFirst([1, 2, 3])
x.toUpperCase() // 런타임 에러! number에 toUpperCase 없음. 하지만 TS는 모름

// 타입을 지정하면 컴파일 타임에 잡힘
function goodFirst(arr: number[]): number {
  return arr[0]
}
const y = goodFirst([1, 2, 3])
// y.toUpperCase()  // TS Error! number에 toUpperCase 없음

// 하지만 이러면 string[]용, boolean[]용 함수를 따로 만들어야 함...
// → 이 문제를 Generic이 해결!

// ============================================================
// 과제 1: 타입을 정확히 지정하기
// ============================================================

// TODO: 각 함수에 올바른 타입 어노테이션 추가

function greet(name: any): any {
  return `안녕, ${name}!`
}

function sum(numbers: any): any {
  return numbers.reduce((a: any, b: any) => a + b, 0)
}

function findIndex(arr: any, target: any): any {
  return arr.indexOf(target)
}

// ============================================================
// 과제 2: 함수 타입 표현하기
// ============================================================

// TODO: callback의 타입을 정확히 지정
function transform(value: number, callback: any): any {
  return callback(value)
}

// transform(5, (x) => x * 2) → 10
// transform(5, (x) => String(x)) → '5'
// 이 두 경우를 다 지원하려면? → Generic이 필요한 이유!

export { greet, sum, findIndex, transform }
