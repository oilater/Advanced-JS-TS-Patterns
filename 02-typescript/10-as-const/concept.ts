/**
 * TS 패턴 10: as const — 리터럴 타입 고정
 * 난이도: ★☆☆
 *
 * as const를 붙이면:
 * - 모든 값이 리터럴 타입으로 고정됨
 * - 전체가 readonly가 됨
 * - 판별 유니온과 결합하면 매우 강력!
 */

// ============================================================
// 기본 비교
// ============================================================

// 일반 선언 — 타입이 넓어짐
const configBad = { mode: 'test', port: 3000 }
// configBad.mode → string
// configBad.port → number

// as const — 리터럴 타입 고정
const configGood = { mode: 'test', port: 3000 } as const
// configGood.mode → 'test'
// configGood.port → 3000
// 전체가 readonly

// ============================================================
// Vitest 실제 코드
// packages/runner/src/fixture.ts:39
// ============================================================

const workerContextSuite = { type: 'worker' } as const
// type 필드가 string이 아니라 정확히 'worker'

// 판별 유니온과 결합
type Suite = { type: 'suite'; name: string } | { type: 'worker' }

// as const 없으면
const obj1 = { type: 'worker' } // type: string → Suite로 좁히기 불가

// as const 있으면
const obj2 = { type: 'worker' } as const // type: 'worker' → 정확히 매칭!

// ============================================================
// 실무 활용: 타입 안전한 상수 정의
// ============================================================

const EVENTS = {
  USER_LOGIN: 'user:login',
  USER_LOGOUT: 'user:logout',
  PAGE_VIEW: 'page:view',
} as const

type EventName = (typeof EVENTS)[keyof typeof EVENTS]
// → 'user:login' | 'user:logout' | 'page:view'

function emit(event: EventName, data?: unknown) {
  /* ... */
}
emit('user:login') // OK
// emit('user:signup') // Error! — 정의되지 않은 이벤트
emit(EVENTS.PAGE_VIEW) // OK

export { EVENTS, configGood }
export type { EventName }
