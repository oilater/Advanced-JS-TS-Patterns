// satisfies 과제

type Route = {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  handler: string
}

/** 과제 1: satisfies로 라우트 설정 검증 */
export const routes = [
  { path: '/users', method: 'GET', handler: 'getUsers' },
  { path: '/users', method: 'POST', handler: 'createUser' },
  { path: '/users/:id', method: 'PUT', handler: 'updateUser' },
] satisfies Route[]

/** 과제 2: 테마 색상 */
export const theme = {
  primary: '#3b82f6',
  secondary: '#64748b',
  danger: '#ef4444',
} satisfies Record<string, string>

/** 과제 3: 라우트의 메서드별 핸들러를 반환 */
export function getHandler(index: number): string {
  // routes[index].handler 반환
  throw new Error('구현해보세요!')
}
