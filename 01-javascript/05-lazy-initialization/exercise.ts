// Lazy Initialization 과제

/** 과제 1: Lazy 클래스 — 첫 접근 시에만 factory 실행 */
export class Lazy<T> {
  constructor(private factory: () => T) {}

  get value(): T {
    throw new Error('구현해보세요!')
  }
}

/** 과제 2: lazyInit 함수형 버전 */
export function lazyInit<T>(factory: () => T): () => T {
  throw new Error('구현해보세요!')
}

/** 과제 3: LazyMap — key별 lazy 초기화 */
export class LazyMap<K, V> {
  constructor(private factory: (key: K) => V) {}

  get(key: K): V {
    throw new Error('구현해보세요!')
  }
}
