// WeakMap 과제

/**
 * 과제 1: 객체 기반 메모이제이션 (같은 참조면 캐시)
 *
 * const getSum = weakMemoize((arr: number[]) => arr.reduce((a, b) => a + b, 0))
 * const arr = [1, 2, 3]
 * getSum(arr)     → 6   (계산)
 * getSum(arr)     → 6   (캐시 — 같은 참조)
 * getSum([1,2,3]) → 6   (새로 계산 — 다른 참조!)
 */
export function weakMemoize<T extends object, R>(fn: (arg: T) => R): (arg: T) => R {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 객체에 숨겨진 메타데이터 저장소
 *
 * const store = new MetadataStore<object, number>()
 * const obj = { name: 'test' }
 * store.set(obj, 42)
 * store.get(obj)  → 42
 * store.has(obj)  → true
 * store.get({})   → undefined (다른 참조)
 */
export class MetadataStore<T extends object, M> {
  set(target: T, metadata: M): void {
    throw new Error('구현해보세요!')
  }

  get(target: T): M | undefined {
    throw new Error('구현해보세요!')
  }

  has(target: T): boolean {
    throw new Error('구현해보세요!')
  }
}
