// 기초 과제: Error 객체

/** 과제 1: 에러에서 메시지와 첫 번째 위치 추출 */
export function parseError(error: Error): {
  message: string
  firstLocation: string | null
} {
  // error.stack에서 첫 번째 "at ..." 줄 추출
  throw new Error('구현해보세요!')
}

/** 과제 2: 두 에러의 스택 합치기 */
export function mergeStacks(error: Error, context: Error): Error {
  // error의 메시지 유지 + 스택 아래에 "--- context ---" + context 스택
  throw new Error('구현해보세요!')
}
