// Lazy Initialization 과제

/**
 * 과제 1: Lazy 클래스 — 첫 접근 시에만 factory 실행, 이후 캐시
 *
 * const lazy = new Lazy(() => { console.log('계산!'); return 42 })
 * // (아직 "계산!" 안 나옴)
 * lazy.value  → 42  (콘솔: "계산!")
 * lazy.value  → 42  (콘솔 출력 없음 — 캐시됨)
 */
export class Lazy<T> {
  constructor(private factory: () => T) {}

  get value(): T {
    throw new Error('구현해보세요!')
  }
}

/**
 * 과제 2: lazyInit 함수형 버전
 *
 * const getConfig = lazyInit(() => ({ debug: true }))
 * getConfig() → { debug: true }  (첫 호출에 생성)
 * getConfig() → { debug: true }  (같은 참조 — 캐시)
 * getConfig() === getConfig()  → true
 */
export function lazyInit<T>(factory: () => T): () => T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: LazyMap — key별로 독립적으로 lazy 초기화
 *
 * const users = new LazyMap((id) => ({ id, name: `User ${id}` }))
 * users.get('1') → { id: '1', name: 'User 1' }  (생성)
 * users.get('1') → { id: '1', name: 'User 1' }  (캐시)
 * users.get('2') → { id: '2', name: 'User 2' }  (다른 key → 새로 생성)
 */
export class LazyMap<K, V> {
  constructor(private factory: (key: K) => V) {}

  get(key: K): V {
    throw new Error('구현해보세요!')
  }
}
