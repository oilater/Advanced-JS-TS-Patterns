// Generic 과제

/**
 * 과제 1: 배열의 마지막 요소 반환
 *
 * last([1, 2, 3])  → 3
 * last(['a', 'b']) → 'b'
 * last([])         → undefined
 */
export function last<T>(arr: T[]): T | undefined {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 두 객체 병합 (불변 — 원본 수정 금지)
 *
 * merge({ name: 'kim' }, { age: 25 }) → { name: 'kim', age: 25 }
 * // 원본 객체는 변경되지 않아야 함
 */
export function merge<A extends object, B extends object>(a: A, b: B): A & B {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: 제네릭 스택 (LIFO)
 *
 * const s = new Stack<number>()
 * s.push(1); s.push(2); s.push(3)
 * s.pop()  → 3
 * s.peek() → 2  (제거하지 않음)
 * s.size   → 2
 */
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

/**
 * 과제 4: 객체 배열에서 특정 키의 값만 추출
 *
 * const users = [{ name: 'kim', age: 25 }, { name: 'lee', age: 30 }]
 * pluck(users, 'name') → ['kim', 'lee']
 * pluck(users, 'age')  → [25, 30]
 */
export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  throw new Error('구현해보세요!')
}
