// as const 과제

const STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type AppState = (typeof STATES)[keyof typeof STATES]

/**
 * 과제 1: 상태 전이 함수
 *
 * transition('idle', 'fetch')     → 'loading'
 * transition('loading', 'resolve') → 'success'
 * transition('loading', 'reject')  → 'error'
 * transition('success', 'reset')   → 'idle'
 * transition('error', 'reset')     → 'idle'
 * transition('idle', 'unknown')    → 'idle'  (모르는 action → 현재 유지)
 */
export function transition(current: AppState, action: string): AppState {
  throw new Error('구현해보세요!')
}

const PERMISSIONS = ['read', 'write', 'admin'] as const
export type Permission = (typeof PERMISSIONS)[number]

/**
 * 과제 2: 권한 확인
 *
 * hasPermission(['read', 'write'], 'read')  → true
 * hasPermission(['read'], 'admin')           → false
 * hasPermission([], 'read')                  → false
 */
export function hasPermission(
  userPermissions: readonly Permission[],
  required: Permission,
): boolean {
  throw new Error('구현해보세요!')
}

export { STATES, PERMISSIONS }
