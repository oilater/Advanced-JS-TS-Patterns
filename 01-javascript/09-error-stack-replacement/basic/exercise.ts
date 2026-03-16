// 기초 과제: Error 객체

/**
 * 과제 1: 에러에서 메시지와 첫 번째 위치 추출
 *
 * const e = new Error('test error')
 * parseError(e).message       → 'test error'
 * parseError(e).firstLocation → '    at Object.<anonymous> (...)'
 */
export function parseError(error: Error): {
  message: string
  firstLocation: string | null
} {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 두 에러의 스택 합치기
 *
 * const error = new Error('런타임 에러')
 * const context = new Error('등록 시점')
 * const merged = mergeStacks(error, context)
 *
 * merged.message → '런타임 에러'
 * merged.stack   →
 *   "Error: 런타임 에러\n    at ...\n--- context ---\n    at ..."
 */
export function mergeStacks(error: Error, context: Error): Error {
  throw new Error('구현해보세요!')
}
