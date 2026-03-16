// satisfies 과제

type Route = {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  handler: string
}

/** satisfies로 검증 — routes[0].method 타입이 'GET' (리터럴!) */
export const routes = [
  { path: '/users', method: 'GET', handler: 'getUsers' },
  { path: '/users', method: 'POST', handler: 'createUser' },
  { path: '/users/:id', method: 'PUT', handler: 'updateUser' },
] satisfies Route[]

/** satisfies로 검증 — theme.primary 타입이 '#3b82f6' (리터럴!) */
export const theme = {
  primary: '#3b82f6',
  secondary: '#64748b',
  danger: '#ef4444',
} satisfies Record<string, string>

/**
 * 과제 1: 인덱스로 핸들러 반환
 *
 * getHandler(0) → 'getUsers'
 * getHandler(2) → 'updateUser'
 */
export function getHandler(index: number): string {
  throw new Error('구현해보세요!')
}
