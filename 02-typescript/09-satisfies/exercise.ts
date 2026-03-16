/**
 * satisfies — 직접 만들어보기
 */

// ============================================================
// 과제: 라우트 설정에 satisfies 적용
// ============================================================

type Route = {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  handler: string
}

// satisfies로 검증하면서 구체적 타입 유지
const routes = [
  { path: '/users', method: 'GET', handler: 'getUsers' },
  { path: '/users', method: 'POST', handler: 'createUser' },
  { path: '/users/:id', method: 'PUT', handler: 'updateUser' },
] satisfies Route[]

// routes[0].method 의 타입은? → 'GET' (리터럴!)
// satisfies 없이 Route[]로 선언하면 → 'GET' | 'POST' | 'PUT' | 'DELETE' (넓어짐)

// ============================================================
// 과제 2: 테마 색상에 satisfies 적용
// ============================================================

type ThemeColors = Record<string, string>

const theme = {
  primary: '#3b82f6',
  secondary: '#64748b',
  danger: '#ef4444',
  success: '#22c55e',
} satisfies ThemeColors

// theme.primary  → '#3b82f6' (리터럴!)
// theme.unknown  → 에러! (존재하지 않는 키)

export { routes, theme }
