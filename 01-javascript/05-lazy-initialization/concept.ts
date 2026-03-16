/**
 * 패턴 5: Lazy Initialization — 처음 쓸 때만 계산
 * 중요도: ★★★★☆ | 난이도: ★☆☆
 *
 * 비싼 계산을 실제로 필요할 때까지 미루는 것.
 * React의 useMemo, React.lazy와 같은 발상.
 */

// ============================================================
// 1. Vitest 실제 코드
//    packages/vitest/src/node/reporters/reported-tasks.ts:131
// ============================================================

/**
 * private 필드(#)에 캐시하고, getter로 처음 접근 시만 계산
 */
class TestCase {
  #fullName: string | undefined
  name: string
  parent: { type: string; fullName?: string }

  constructor(name: string, parent: { type: string; fullName?: string }) {
    this.name = name
    this.parent = parent
  }

  get fullName(): string {
    if (this.#fullName === undefined) {
      if (this.parent.type !== 'module') {
        this.#fullName = `${this.parent.fullName} > ${this.name}`
      } else {
        this.#fullName = this.name
      }
    }
    return this.#fullName
  }
}

// ============================================================
// 2. React/실무 활용 예제
// ============================================================

// 2-1. React.lazy — 컴포넌트를 처음 렌더링할 때만 로드
// const HeavyChart = React.lazy(() => import('./HeavyChart'))

// 2-2. useMemo — 값을 의존성 변할 때만 재계산
// const sorted = useMemo(() => {
//   return items.sort((a, b) => a.price - b.price)
// }, [items])

// 2-3. useRef로 한 번만 초기화
function useOnce<T>(factory: () => T): T {
  // 실제 React에서는 useRef 사용
  let ref: { current: T | undefined } = { current: undefined }
  if (!ref.current) {
    ref.current = factory()
  }
  return ref.current
}

// 2-4. 모듈 레벨 lazy singleton
let _db: any | null = null
function getDB() {
  if (!_db) {
    _db = { connected: true } // new Database(process.env.DB_URL)
  }
  return _db
}

export { TestCase, useOnce, getDB }
