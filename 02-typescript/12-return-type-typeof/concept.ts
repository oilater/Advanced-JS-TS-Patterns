/**
 * TS 패턴 12: ReturnType + typeof — 값에서 타입 추출
 * 난이도: ★★☆
 *
 * typeof  → 값을 타입으로 변환
 * ReturnType  → 함수 타입의 반환 타입 추출
 *
 * 함수 구현이 바뀌면 타입도 자동으로 따라감!
 */

// ============================================================
// 기본
// ============================================================

function createUser() {
  return { id: 1, name: 'kim', role: 'admin' as const }
}

// 함수 반환값의 타입을 자동 추출
type User = ReturnType<typeof createUser>
// → { id: number; name: string; role: 'admin' }

// ============================================================
// Vitest 실제 코드
// packages/expect/src/types.ts:78
// ============================================================

// getMatcherUtils 함수의 반환 타입을 직접 안 쓰고 ReturnType으로 추출
// 함수 구현이 바뀌면 타입도 자동으로 따라감!

function getMatcherUtils() {
  return {
    printReceived: (value: unknown) => String(value),
    printExpected: (value: unknown) => String(value),
    matcherHint: (name: string) => `expect().${name}()`,
  }
}

type MatcherUtils = ReturnType<typeof getMatcherUtils>
// → { printReceived: (value: unknown) => string; ... }

// ============================================================
// 실무 활용
// ============================================================

// 팩토리 함수의 반환 타입 추출
function createStore(initialState: { count: number; name: string }) {
  return {
    getState: () => ({ ...initialState }),
    setState: (updates: Partial<typeof initialState>) => {
      Object.assign(initialState, updates)
    },
    subscribe: (cb: (state: typeof initialState) => void) => {
      /* ... */
    },
  }
}

type Store = ReturnType<typeof createStore>

// 이제 Store 타입을 다른 곳에서 사용 가능
function useStore(store: Store) {
  const state = store.getState()
  state.count // number — 타입 추론!
}

export type { User, MatcherUtils, Store }
export { createUser, createStore }
