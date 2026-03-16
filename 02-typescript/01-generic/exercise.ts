/**
 * Generic — 직접 만들어보기
 */

// ============================================================
// 과제 1: 배열의 마지막 요소를 반환하는 제네릭 함수
// ============================================================

function last<T>(arr: T[]): T | undefined {
  // TODO
  throw new Error('구현해보세요!')
}

// last([1, 2, 3])     // number | undefined
// last(['a', 'b'])    // string | undefined

// ============================================================
// 과제 2: 두 객체를 병합하는 제네릭 함수
// ============================================================

function merge<A extends object, B extends object>(a: A, b: B): A & B {
  // TODO: 불변성 유지 (spread 사용)
  throw new Error('구현해보세요!')
}

// const result = merge({ name: 'kim' }, { age: 25 })
// result.name  // string (타입 추론!)
// result.age   // number (타입 추론!)

// ============================================================
// 과제 3: 제네릭 스택 자료구조
// ============================================================

class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    // TODO
  }

  pop(): T | undefined {
    // TODO
    return undefined
  }

  peek(): T | undefined {
    // TODO
    return undefined
  }

  get size(): number {
    return this.items.length
  }
}

// const numStack = new Stack<number>()
// numStack.push(1)
// numStack.push(2)
// numStack.pop() // number | undefined
//
// const strStack = new Stack<string>()
// strStack.push('hello')
// strStack.pop() // string | undefined

export { last, merge, Stack }
