import { describe, it, expect } from 'vitest'
import { copyStackTrace, SafeEmitter, withBetterStack } from './exercise'

describe('copyStackTrace', () => {
  it('target의 message를 유지하면서 source의 스택을 복사', () => {
    const source = new Error('SOURCE')
    const target = new Error('실제 에러 메시지')

    copyStackTrace(target, source)

    expect(target.stack).toContain('실제 에러 메시지')
    expect(target.stack).not.toContain('SOURCE')
    // source의 스택 라인은 유지 (at ... 부분)
    expect(target.stack).toContain('at ')
  })
})

describe('SafeEmitter', () => {
  it('정상 동작 시 핸들러 실행', () => {
    const emitter = new SafeEmitter()
    const results: number[] = []

    emitter.on('data', (x: number) => results.push(x * 2))
    emitter.emit('data', 5)

    expect(results).toEqual([10])
  })

  it('에러 시 등록 시점의 스택을 포함', () => {
    const emitter = new SafeEmitter()

    emitter.on('data', () => {
      throw new Error('핸들러 에러!')
    })

    try {
      emitter.emit('data')
      expect.unreachable()
    } catch (e: any) {
      expect(e.message).toBe('핸들러 에러!')
      // 스택에 등록 시점의 정보가 포함되어야 함
      expect(e.stack).toContain('at ')
    }
  })
})

describe('withBetterStack', () => {
  it('에러 시 래핑 시점의 스택을 보여준다', () => {
    const wrapped = withBetterStack(() => {
      throw new Error('내부 에러')
    })

    try {
      wrapped()
      expect.unreachable()
    } catch (e: any) {
      expect(e.message).toBe('내부 에러')
      expect(e.stack).toContain('at ')
    }
  })

  it('정상 동작 시 결과를 그대로 반환', () => {
    const wrapped = withBetterStack((x: number) => x * 2)
    expect(wrapped(5)).toBe(10)
  })
})
