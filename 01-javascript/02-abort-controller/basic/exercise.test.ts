import { describe, it, expect, vi } from 'vitest'
import { delay, fetchAll, fastest, startTimer } from './exercise'

describe('delay', () => {
  it('지정된 시간 후 resolve', async () => {
    const start = Date.now()
    await delay(50)
    expect(Date.now() - start).toBeGreaterThanOrEqual(40)
  })

  it('resolve 값은 undefined', async () => {
    await expect(delay(10)).resolves.toBeUndefined()
  })
})

describe('fetchAll', () => {
  it('모든 결과를 배열로 반환', async () => {
    const result = await fetchAll()
    expect(result).toEqual(['A', 'B', 'C'])
  })
})

describe('fastest', () => {
  it('가장 빠른 결과를 반환', async () => {
    const result = await fastest()
    expect(result).toBe('빠름')
  })
})

describe('startTimer', () => {
  it('intervalMs마다 callback을 호출한다', async () => {
    const fn = vi.fn()
    const stop = startTimer(fn, 30)

    await delay(100)
    stop()

    expect(fn.mock.calls.length).toBeGreaterThanOrEqual(2)
  })

  it('cleanup 후에는 더 이상 호출되지 않는다', async () => {
    const fn = vi.fn()
    const stop = startTimer(fn, 20)

    await delay(50)
    stop()
    const countAfterStop = fn.mock.calls.length

    await delay(60)
    expect(fn.mock.calls.length).toBe(countAfterStop)
  })
})
