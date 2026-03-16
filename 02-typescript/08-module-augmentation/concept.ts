/**
 * TS 패턴 8: 모듈 확장 (Module Augmentation)
 * 난이도: ★★☆
 *
 * 외부 라이브러리의 타입에 새 필드를 추가하고 싶을 때.
 * 라이브러리 코드를 수정하지 않고!
 *
 * declare module 'xxx' { interface Yyy { ... } }
 */

// ============================================================
// 기본 예제: Express Request 확장
// ============================================================

// 원래 express의 Request에는 user가 없음
// 하지만 미들웨어에서 붙여줬으니까 타입에도 추가하고 싶음

// declare module 'express' {
//   interface Request {
//     user?: { id: string; name: string }
//   }
// }

// 이제 어디서든:
// app.get('/', (req, res) => {
//   req.user?.name  // 타입 에러 없음!
// })

// ============================================================
// Vitest 실제 코드
// packages/vitest/src/types/global.ts:24
// ============================================================

// @vitest/expect 패키지의 인터페이스를 확장
// declare module '@vitest/expect' {
//   interface MatcherState {
//     environment: string
//     snapshotState: SnapshotState
//   }
//   interface ExpectStatic {
//     assert: Chai.AssertStatic
//     soft: <T>(actual: T, message?: string) => Assertion<T>
//   }
//   interface Assertion<T> {
//     toMatchSnapshot: SnapshotMatcher<T>
//   }
// }

// 왜 강력하냐면:
// Vitest는 모노레포. 각 패키지는 서로의 구현을 모름.
// 하지만 vitest 메인 패키지에서 모듈 확장으로 타입을 합쳐줌.
//
// @vitest/expect  →  Assertion<T> { toBe, toEqual, ... }
//                           ↓ 모듈 확장
// vitest          →  Assertion<T> { toBe, toEqual, ..., toMatchSnapshot }

// ============================================================
// Window 전역 타입 확장 예제
// ============================================================

declare global {
  interface Window {
    analytics?: {
      track: (event: string, data?: Record<string, unknown>) => void
      identify: (userId: string) => void
    }
  }
}

// 이제 타입 에러 없이:
// window.analytics?.track('page_view', { page: '/home' })

export {}
