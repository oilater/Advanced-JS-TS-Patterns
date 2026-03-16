/**
 * 타입 가드 — 직접 만들어보기
 */

// ============================================================
// 과제: API 응답을 안전하게 처리하는 타입 가드
// ============================================================

interface SuccessResponse {
  status: 'ok'
  data: unknown
}
interface ErrorResponse {
  status: 'error'
  message: string
}
type ApiResponse = SuccessResponse | ErrorResponse

function isSuccess(res: ApiResponse): res is SuccessResponse {
  // TODO
  throw new Error('구현해보세요!')
}

function isError(res: ApiResponse): res is ErrorResponse {
  // TODO
  throw new Error('구현해보세요!')
}

// 사용:
// const res: ApiResponse = await fetchApi()
// if (isSuccess(res)) {
//   console.log(res.data)     // SuccessResponse로 좁혀짐
// } else {
//   console.log(res.message)  // ErrorResponse로 좁혀짐
// }

// ============================================================
// 보너스: 배열에서 null/undefined 필터링 타입 가드
// ============================================================

function isNotNullish<T>(value: T | null | undefined): value is T {
  // TODO
  throw new Error('구현해보세요!')
}

// const mixed = [1, null, 2, undefined, 3]
// const clean = mixed.filter(isNotNullish)
// // clean: number[] (null | undefined 제거됨!)

export { isSuccess, isError, isNotNullish }
