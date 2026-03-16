import { describe, it, expect, vi } from 'vitest'
import { withRetry, withLogging, withTimeout, compose } from './exercise'

describe('withRetry', () => {
  it('성공하면 바로 반환', async () => {
    const fn = vi.fn().mockResolvedValue('ok')
    const retried = withRetry(fn, 3)

    expect(await retried()).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('실패 후 재시도해서 성공', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok')

    const retried = withRetry(fn, 3)
    expect(await retried()).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('maxRetries 초과하면 마지막 에러를 throw', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fail'))
    const retried = withRetry(fn, 2)

    await expect(retried()).rejects.toThrow('always fail')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('원래 함수의 인자를 전달한다', async () => {
    const fn = vi.fn().mockImplementation(async (a: number, b: number) => a + b)
    const retried = withRetry(fn, 3)

    expect(await retried(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledWith(1, 2)
  })
})

describe('withLogging', () => {
  it('호출/반환을 로깅한다', () => {
    const logs: string[] = []
    const origLog = console.log
    console.log = (...args: any[]) => logs.push(args.join(' '))

    const add = withLogging('add', (a: number, b: number) => a + b)
    const result = add(1, 2)

    console.log = origLog

    expect(result).toBe(3)
    expect(logs.some(l => l.includes('add') && l.includes('1') && l.includes('2'))).toBe(true)
    expect(logs.some(l => l.includes('add') && l.includes('3'))).toBe(true)
  })

  it('에러 시 에러를 로깅하고 다시 throw', () => {
    const logs: string[] = []
    const origLog = console.log
    console.log = (...args: any[]) => logs.push(args.join(' '))

    const failing = withLogging('boom', () => { throw new Error('oops') })

    expect(() => failing()).toThrow('oops')
    console.log = origLog

    expect(logs.some(l => l.includes('boom') && l.includes('oops'))).toBe(true)
  })
})

describe('withTimeout', () => {
  it('시간 내에 완료되면 결과 반환', async () => {
    const fast = async () => 'done'
    const timed = withTimeout(fast, 1000)

    expect(await timed()).toBe('done')
  })

  it('시간 초과하면 reject', async () => {
    const slow = () => new Promise((r) => setTimeout(() => r('late'), 500))
    const timed = withTimeout(slow, 50)

    await expect(timed()).rejects.toThrow()
  })
})

describe('compose', () => {
  it('오른쪽에서 왼쪽으로 합성', () => {
    const add1 = (x: number) => x + 1
    const times2 = (x: number) => x * 2
    const square = (x: number) => x ** 2

    const fn = compose(square, times2, add1)
    // add1(3) = 4 → times2(4) = 8 → square(8) = 64
    expect(fn(3)).toBe(64)
  })

  it('함수 하나면 그대로 실행', () => {
    const add1 = (x: number) => x + 1
    expect(compose(add1)(5)).toBe(6)
  })

  it('빈 compose는 identity', () => {
    const identity = compose<number>()
    expect(identity(42)).toBe(42)
  })
})
