// as const 과제

const STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type AppState = (typeof STATES)[keyof typeof STATES]

/** 과제 1: 상태 전이 함수 */
export function transition(current: AppState, action: string): AppState {
  // IDLE    + 'fetch'   → LOADING
  // LOADING + 'resolve' → SUCCESS
  // LOADING + 'reject'  → ERROR
  // SUCCESS | ERROR + 'reset' → IDLE
  // 그 외 → current 그대로 반환
  throw new Error('구현해보세요!')
}

/** 과제 2: 배열 as const에서 타입 추출 */
const PERMISSIONS = ['read', 'write', 'admin'] as const
export type Permission = (typeof PERMISSIONS)[number]

export function hasPermission(
  userPermissions: readonly Permission[],
  required: Permission,
): boolean {
  throw new Error('구현해보세요!')
}

export { STATES, PERMISSIONS }
