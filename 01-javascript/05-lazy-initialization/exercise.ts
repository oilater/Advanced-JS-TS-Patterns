/**
 * Lazy Initialization — 직접 만들어보기
 *
 * 목표: 지연 초기화 패턴을 직접 구현한다.
 */

// ============================================================
// 과제 1: Lazy 클래스
// ============================================================

class Lazy<T> {
  #value: T | undefined
  #factory: () => T

  constructor(factory: () => T) {
    this.#factory = factory
  }

  get value(): T {
    // TODO: 처음에만 factory 실행, 이후 캐시된 값 반환
    throw new Error('구현해보세요!')
  }
}

// 테스트:
// const expensive = new Lazy(() => {
//   console.log('계산 중...')
//   return Array.from({ length: 1000000 }, (_, i) => i)
// })
// expensive.value  // "계산 중..." 출력
// expensive.value  // 출력 없음 (캐시됨)

// ============================================================
// 과제 2: lazyInit 함수 — 함수형 버전
// ============================================================

function lazyInit<T>(factory: () => T): () => T {
  // TODO: 첫 호출에만 factory 실행, 이후 캐시 반환
  // Lazy 클래스와 같은 동작이지만 함수로
  throw new Error('구현해보세요!')
}

// 테스트:
// const getConfig = lazyInit(() => {
//   console.log('설정 로딩...')
//   return { debug: true, port: 3000 }
// })
// getConfig() // "설정 로딩..." → { debug: true, port: 3000 }
// getConfig() // (캐시) → { debug: true, port: 3000 }

// ============================================================
// 과제 3: LazyMap — key별 lazy 초기화
// ============================================================

class LazyMap<K, V> {
  #map = new Map<K, V>()
  #factory: (key: K) => V

  constructor(factory: (key: K) => V) {
    this.#factory = factory
  }

  get(key: K): V {
    // TODO: key가 없으면 factory로 생성, 있으면 캐시 반환
    throw new Error('구현해보세요!')
  }
}

// 테스트:
// const userCache = new LazyMap((id: string) => {
//   console.log(`Loading user ${id}`)
//   return { id, name: `User ${id}` }
// })
// userCache.get('1') // "Loading user 1" → { id: '1', name: 'User 1' }
// userCache.get('1') // (캐시) → { id: '1', name: 'User 1' }
// userCache.get('2') // "Loading user 2" → { id: '2', name: 'User 2' }

export { Lazy, lazyInit, LazyMap }
