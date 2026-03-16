// Generic 과제

/** 과제 1: 배열의 마지막 요소 반환 */
export function last<T>(arr: T[]): T | undefined {
  throw new Error('구현해보세요!')
}

/** 과제 2: 두 객체 병합 (불변) */
export function merge<A extends object, B extends object>(a: A, b: B): A & B {
  throw new Error('구현해보세요!')
}

/** 과제 3: 제네릭 스택 */
export class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    throw new Error('구현해보세요!')
  }

  pop(): T | undefined {
    throw new Error('구현해보세요!')
  }

  peek(): T | undefined {
    throw new Error('구현해보세요!')
  }

  get size(): number {
    return this.items.length
  }
}

/** 과제 4: 제네릭 제약 — key가 실제 T의 키인지 보장 */
export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  throw new Error('구현해보세요!')
}
