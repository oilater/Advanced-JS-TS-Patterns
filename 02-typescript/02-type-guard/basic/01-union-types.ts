/**
 * 기초 1: 유니온 타입과 타입 좁히기 (Narrowing)
 *
 * 타입 가드를 이해하려면 먼저 유니온 타입과
 * TypeScript가 타입을 자동으로 좁히는 방법을 알아야 한다.
 */

// ============================================================
// 유니온 타입 = "이것 또는 저것"
// ============================================================

type StringOrNumber = string | number

function process(value: StringOrNumber) {
  // value는 string 일 수도, number 일 수도 있다
  // 그래서 string에만 있는 메서드를 바로 쓸 수 없다
  // value.toUpperCase()  // Error! number에는 없으니까
}

// ============================================================
// typeof로 타입 좁히기 (Narrowing)
// ============================================================

function display(value: string | number) {
  if (typeof value === 'string') {
    // 이 블록 안에서 value는 string!
    console.log(value.toUpperCase()) // OK!
  } else {
    // 이 블록 안에서 value는 number!
    console.log(value.toFixed(2)) // OK!
  }
}

// ============================================================
// instanceof로 클래스 좁히기
// ============================================================

class Dog {
  bark() {
    return '멍!'
  }
}
class Cat {
  meow() {
    return '야옹!'
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    console.log(animal.bark()) // Dog로 좁혀짐
  } else {
    console.log(animal.meow()) // Cat으로 좁혀짐
  }
}

// ============================================================
// 'in' 연산자로 좁히기
// ============================================================

interface Fish {
  swim: () => void
}
interface Bird {
  fly: () => void
}

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    animal.swim() // Fish로 좁혀짐
  } else {
    animal.fly() // Bird로 좁혀짐
  }
}

// ============================================================
// 과제 1: typeof로 안전하게 처리
// ============================================================

function formatValue(value: string | number | boolean): string {
  // TODO:
  // - string → 대문자로
  // - number → 소수점 2자리
  // - boolean → 'Yes' 또는 'No'
  throw new Error('구현해보세요!')
}

// formatValue('hello')  // 'HELLO'
// formatValue(3.14159)  // '3.14'
// formatValue(true)     // 'Yes'

// ============================================================
// 과제 2: 배열인지 확인
// ============================================================

function total(input: number | number[]): number {
  // TODO:
  // - number면 그대로 반환
  // - number[]면 합계 반환
  // 힌트: Array.isArray()
  throw new Error('구현해보세요!')
}

// total(5)          // 5
// total([1, 2, 3])  // 6

// ============================================================
// 과제 3: null 안전하게 처리
// ============================================================

function getLength(value: string | null | undefined): number {
  // TODO: value가 null/undefined면 0, 아니면 길이 반환
  throw new Error('구현해보세요!')
}

// getLength('hello')     // 5
// getLength(null)        // 0
// getLength(undefined)   // 0

export { formatValue, total, getLength }
