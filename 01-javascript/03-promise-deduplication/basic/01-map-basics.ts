/**
 * 기초 1: Map — key-value 저장소
 *
 * Promise 중복 제거 패턴의 핵심은 Map이다.
 * "이 key로 이미 요청이 진행 중인가?"를 Map으로 확인한다.
 */

// ============================================================
// Map vs 일반 객체
// ============================================================

// 일반 객체 — key가 string만 가능
const obj: Record<string, number> = {}
obj['a'] = 1

// Map — key가 아무 타입이나 가능
const map = new Map<string, number>()
map.set('a', 1)
map.get('a') // 1
map.has('a') // true
map.delete('a')
map.size // 0

// ============================================================
// Map의 핵심 메서드
// ============================================================

const cache = new Map<string, any>()

// set: 저장
cache.set('user:1', { name: 'kim' })

// get: 조회
const user = cache.get('user:1') // { name: 'kim' }

// has: 존재 확인
if (cache.has('user:1')) {
  console.log('캐시에 있음!')
}

// delete: 삭제
cache.delete('user:1')

// clear: 전부 삭제
cache.clear()

// 순회
cache.set('a', 1)
cache.set('b', 2)
for (const [key, value] of cache) {
  console.log(key, value) // 'a' 1, 'b' 2
}

// ============================================================
// Map으로 간단한 캐시 만들기
// ============================================================

function createCache<T>() {
  const store = new Map<string, T>()

  return {
    get(key: string): T | undefined {
      return store.get(key)
    },
    set(key: string, value: T): void {
      store.set(key, value)
    },
    has(key: string): boolean {
      return store.has(key)
    },
    clear(): void {
      store.clear()
    },
  }
}

const userCache = createCache<{ name: string }>()
userCache.set('1', { name: 'kim' })
userCache.get('1') // { name: 'kim' }

// ============================================================
// 과제 1: 단어 빈도수 세기
// ============================================================

function countWords(words: string[]): Map<string, number> {
  // TODO: 각 단어가 몇 번 나오는지 Map으로 반환
  // countWords(['a', 'b', 'a', 'c', 'b', 'a'])
  // → Map { 'a' => 3, 'b' => 2, 'c' => 1 }
  throw new Error('구현해보세요!')
}

// ============================================================
// 과제 2: getOrCreate — 없으면 만들어서 넣기
// ============================================================

function getOrCreate<K, V>(map: Map<K, V>, key: K, factory: () => V): V {
  // TODO:
  // - key가 있으면 기존 값 반환
  // - 없으면 factory()로 만들어서 map에 저장하고 반환
  // 이 패턴이 Promise 중복 제거의 기반!
  throw new Error('구현해보세요!')
}

// const m = new Map<string, number[]>()
// getOrCreate(m, 'list', () => []).push(1)
// getOrCreate(m, 'list', () => []).push(2)
// m.get('list') // [1, 2]

// ============================================================
// 과제 3: TTL 캐시 — 시간 지나면 자동 삭제
// ============================================================

function createTTLCache<T>(ttlMs: number) {
  // TODO:
  // - set(key, value): 값 저장 + 타임스탬프 기록
  // - get(key): ttlMs 내면 반환, 지났으면 삭제하고 undefined
  throw new Error('구현해보세요!')
}

export { createCache, countWords, getOrCreate, createTTLCache }
