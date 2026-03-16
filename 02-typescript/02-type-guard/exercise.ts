// 타입 가드 과제

interface SuccessResponse { status: 'ok'; data: unknown }
interface ErrorResponse { status: 'error'; message: string }
export type ApiResponse = SuccessResponse | ErrorResponse

/**
 * 과제 1: 성공 응답 타입 가드
 *
 * isSuccess({ status: 'ok', data: [] })     → true
 * isSuccess({ status: 'error', message: '' }) → false
 */
export function isSuccess(res: ApiResponse): res is SuccessResponse {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 에러 응답 타입 가드
 *
 * isError({ status: 'error', message: 'fail' }) → true
 * isError({ status: 'ok', data: null })          → false
 */
export function isError(res: ApiResponse): res is ErrorResponse {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: null/undefined 필터링 타입 가드
 *
 * isNotNullish(0)         → true   (0은 값!)
 * isNotNullish('')        → true
 * isNotNullish(null)      → false
 * isNotNullish(undefined) → false
 *
 * [1, null, 2, undefined, 3].filter(isNotNullish) → [1, 2, 3]
 */
export function isNotNullish<T>(value: T | null | undefined): value is T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 4: 특정 프로퍼티 존재 여부 타입 가드
 *
 * hasProperty({ name: 'kim' }, 'name')  → true
 * hasProperty({ name: 'kim' }, 'age')   → false
 * hasProperty({ x: undefined }, 'x')    → true  (값이 undefined여도 키가 있으면!)
 */
export function hasProperty<T extends object, K extends string>(
  obj: T,
  key: K,
): obj is T & Record<K, unknown> {
  throw new Error('구현해보세요!')
}
