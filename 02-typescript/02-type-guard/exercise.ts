// 타입 가드 과제

interface SuccessResponse { status: 'ok'; data: unknown }
interface ErrorResponse { status: 'error'; message: string }
export type ApiResponse = SuccessResponse | ErrorResponse

/** 과제 1: 성공 응답 타입 가드 */
export function isSuccess(res: ApiResponse): res is SuccessResponse {
  throw new Error('구현해보세요!')
}

/** 과제 2: 에러 응답 타입 가드 */
export function isError(res: ApiResponse): res is ErrorResponse {
  throw new Error('구현해보세요!')
}

/** 과제 3: null/undefined 필터링 타입 가드 */
export function isNotNullish<T>(value: T | null | undefined): value is T {
  throw new Error('구현해보세요!')
}

/** 과제 4: 특정 프로퍼티 존재 여부 타입 가드 */
export function hasProperty<T extends object, K extends string>(
  obj: T,
  key: K,
): obj is T & Record<K, unknown> {
  throw new Error('구현해보세요!')
}
