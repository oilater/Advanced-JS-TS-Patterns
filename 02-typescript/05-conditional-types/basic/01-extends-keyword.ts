/**
 * 기초 1: extends 키워드 — 값과 타입에서의 다른 의미
 *
 * 조건부 타입에서 extends는 "상속"이 아니라 "포함되는가?"의 의미!
 */

// ============================================================
// 값 레벨의 extends — 클래스 상속
// ============================================================

class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

class Dog extends Animal {
  // Dog는 Animal을 상속
  bark() {
    return '멍!'
  }
}

// ============================================================
// 타입 레벨의 extends — "할당 가능한가?" (assignable)
// ============================================================

// "A extends B" = "A는 B에 할당 가능한가?" = "A는 B의 부분집합인가?"

// string extends string  → true  (같은 타입)
// 'hello' extends string → true  ('hello'는 string의 부분집합)
// string extends 'hello' → false (string은 'hello'보다 넓음)
// number extends string  → false (다른 타입)

// ============================================================
// 제네릭의 extends — 제약 조건
// ============================================================

// "T는 반드시 string이거나 string의 하위 타입이어야 한다"
function printLength<T extends string>(value: T): number {
  return value.length // string이 보장되니까 .length 접근 가능
}

printLength('hello') // OK
// printLength(42)     // Error! number는 string이 아님

// 더 실용적인 예: "객체여야 한다"
function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

getKeys({ a: 1, b: 2 }) // ('a' | 'b')[]
// getKeys("string")      // Error! string은 object가 아님

// ============================================================
// 조건부 타입의 extends — "타입 레벨 if"
// ============================================================

// T extends string ? A : B
// → "T가 string에 할당 가능하면 A, 아니면 B"

type IsString<T> = T extends string ? true : false

type Test1 = IsString<string> // true
type Test2 = IsString<'hello'> // true ('hello'는 string 하위)
type Test3 = IsString<number> // false

// ============================================================
// 과제 1: 타입 레벨 삼항 연산자 만들기
// ============================================================

// TODO: T가 number면 'number', string이면 'string', 그 외 'other'
type TypeName<T> = T extends number
  ? 'number'
  : T extends string
    ? 'string'
    : 'other'

type T1 = TypeName<number> // 'number'
type T2 = TypeName<string> // 'string'
type T3 = TypeName<boolean> // 'other'

// ============================================================
// 과제 2: 배열인지 확인하는 타입
// ============================================================

type IsArray<T> = T extends any[] ? true : false

type T4 = IsArray<number[]> // true
type T5 = IsArray<string> // false

// ============================================================
// 과제 3: 배열이면 요소 타입 추출, 아니면 그대로
// ============================================================

type Flatten<T> = T extends (infer U)[] ? U : T

type T6 = Flatten<string[]> // string
type T7 = Flatten<number> // number

export type { TypeName, IsArray, Flatten }
