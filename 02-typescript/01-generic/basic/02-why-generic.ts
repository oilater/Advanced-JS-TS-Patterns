/**
 * 기초 2: 왜 Generic이 필요한가
 *
 * "타입을 하드코딩하면 유연하지 않고, any를 쓰면 안전하지 않다"
 * → Generic은 둘 다 해결한다!
 */

// ============================================================
// 문제 1: 타입 하드코딩의 한계
// ============================================================

// number 전용
function firstNumber(arr: number[]): number {
  return arr[0]
}

// string 전용
function firstString(arr: string[]): string {
  return arr[0]
}

// boolean 전용
function firstBoolean(arr: boolean[]): boolean {
  return arr[0]
}

// 로직은 완전히 같은데 타입 때문에 3개나 만들어야 함! 😫

// ============================================================
// 문제 2: any는 위험하다
// ============================================================

function firstAny(arr: any[]): any {
  return arr[0]
}

const x = firstAny([1, 2, 3]) // x: any
x.toUpperCase() // 에러 안 남! 하지만 런타임에 터짐

// ============================================================
// 해결: Generic!
// ============================================================

function first<T>(arr: T[]): T {
  return arr[0]
}

// T가 number로 추론됨
const a = first([1, 2, 3]) // a: number
// a.toUpperCase()  // 컴파일 에러! ← 안전!

// T가 string으로 추론됨
const b = first(['hello', 'world']) // b: string
b.toUpperCase() // OK! ← string이니까

// 하나의 함수로 모든 타입 지원 + 타입 안전성 보장!

// ============================================================
// Generic을 읽는 방법
// ============================================================

// function first<T>(arr: T[]): T
//
// 해석:
// "어떤 타입 T에 대해,
//  T의 배열을 받아서,
//  T를 반환하는 함수"
//
// T는 그냥 이름 — A, B, Item, Element 뭐든 가능
// 관례: T(Type), K(Key), V(Value), E(Element)

// ============================================================
// 과제 1: identity 함수
// ============================================================

function identity<T>(value: T): T {
  // TODO: 받은 값을 그대로 반환
  // 이게 가장 간단한 Generic 함수!
  throw new Error('구현해보세요!')
}

// identity(42)       // number
// identity('hello')  // string
// identity(true)     // boolean

// ============================================================
// 과제 2: 배열 래핑
// ============================================================

function toArray<T>(value: T): T[] {
  // TODO: 값을 배열로 감싸서 반환
  throw new Error('구현해보세요!')
}

// toArray(1)       // number[]  → [1]
// toArray('hello') // string[]  → ['hello']

// ============================================================
// 과제 3: 쌍(pair) 만들기
// ============================================================

function pair<A, B>(first: A, second: B): [A, B] {
  // TODO: 두 값을 튜플로 반환
  // 제네릭 매개변수가 2개!
  throw new Error('구현해보세요!')
}

// pair(1, 'hello')     // [number, string]
// pair('a', true)      // [string, boolean]

export { first, identity, toArray, pair }
