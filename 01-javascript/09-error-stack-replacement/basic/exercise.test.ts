import { describe, it, expect } from 'vitest'
import { parseError, mergeStacks } from './exercise'

describe('parseError', () => {
  it('메시지 추출', () => {
    const e = new Error('test error')
    const result = parseError(e)
    expect(result.message).toBe('test error')
  })

  it('첫 번째 위치 추출', () => {
    const e = new Error('test')
    const result = parseError(e)
    expect(result.firstLocation).not.toBeNull()
    expect(result.firstLocation).toContain('at ')
  })
})

describe('mergeStacks', () => {
  it('error 메시지 유지', () => {
    const error = new Error('런타임 에러')
    const context = new Error('등록 시점')
    const merged = mergeStacks(error, context)

    expect(merged.message).toBe('런타임 에러')
  })

  it('--- context --- 구분자 포함', () => {
    const error = new Error('에러')
    const context = new Error('컨텍스트')
    const merged = mergeStacks(error, context)

    expect(merged.stack).toContain('--- context ---')
  })

  it('두 스택 모두 포함', () => {
    const error = new Error('에러')
    const context = new Error('컨텍스트')
    const merged = mergeStacks(error, context)

    // 스택에 at 라인이 여러 개 있어야 함
    const atLines = merged.stack?.match(/at /g)
    expect(atLines!.length).toBeGreaterThan(2)
  })
})
