/**
 * as const — 직접 만들어보기
 */

// ============================================================
// 과제 1: HTTP 메서드 상수
// ============================================================

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const

// typeof와 keyof로 유니온 타입 추출
type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS]
// → 'GET' | 'POST' | 'PUT' | 'DELETE'

// ============================================================
// 과제 2: 상태 머신 정의
// ============================================================

const STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

type AppState = (typeof STATES)[keyof typeof STATES]
// → 'idle' | 'loading' | 'success' | 'error'

function transition(current: AppState, action: string): AppState {
  // TODO: 상태 전이 로직 구현
  // IDLE → LOADING (on 'fetch')
  // LOADING → SUCCESS (on 'resolve')
  // LOADING → ERROR (on 'reject')
  // SUCCESS | ERROR → IDLE (on 'reset')
  throw new Error('구현해보세요!')
}

// ============================================================
// 과제 3: 튜플 + as const
// ============================================================

const PERMISSIONS = ['read', 'write', 'admin'] as const
type Permission = (typeof PERMISSIONS)[number]
// → 'read' | 'write' | 'admin'

function hasPermission(
  userPermissions: Permission[],
  required: Permission,
): boolean {
  return userPermissions.includes(required)
}

export { HTTP_METHODS, STATES, PERMISSIONS, transition, hasPermission }
export type { HttpMethod, AppState, Permission }
