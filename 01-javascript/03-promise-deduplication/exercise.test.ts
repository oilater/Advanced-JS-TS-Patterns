import { describe, it, expect, vi } from 'vitest'
import { dedupe, dedupeWithTTL, dedupeNoErrorCache } from './exercise'

describe('dedupe', () => {
  it('같은 key 동시 호출 시 fn을 한 번만 실행', async () => {
    const fn = vi.fn().mockImplementation(
      async (key: string) => `result-${key}`,
    )
    const deduped = dedupe(fn)

    const [a, b] = await Promise.all([deduped('1'), deduped('1')])

    expect(a).toBe('result-1')
    expect(b).toBe('result-1')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('다른 key는 별도로 실행', async () => {
    const fn = vi.fn().mockImplementation(async (key: string) => key)
    const deduped = dedupe(fn)

    const [a, b] = await Promise.all([deduped('1'), deduped('2')])

    expect(a).toBe('1')
    expect(b).toBe('2')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('완료 후 다시 호출하면 새로 실행', async () => {
    let count = 0
    const fn = async (key: string) => {
      count++
      return count
    }
    const deduped = dedupe(fn)

    const first = await deduped('a')
    const second = await deduped('a')

    expect(first).toBe(1)
    expect(second).toBe(2) // 새로 실행됨
  })
})

describe('dedupeWithTTL', () => {
  it('TTL 내에는 캐시된 결과 반환', async () => {
    let count = 0
    const fn = async () => ++count
    const deduped = dedupeWithTTL(fn, 200)

    const a = await deduped('x')
    const b = await deduped('x')

    expect(a).toBe(1)
    expect(b).toBe(1) // 캐시에서
  })

  it('TTL 지나면 새로 실행', async () => {
    let count = 0
    const fn = async () => ++count
    const deduped = dedupeWithTTL(fn, 30)

    await deduped('x')
    await new Promise((r) => setTimeout(r, 50))
    const result = await deduped('x')

    expect(result).toBe(2)
  })
})

describe('dedupeNoErrorCache', () => {
  it('성공 시 진행 중 요청 공유', async () => {
    const fn = vi.fn().mockResolvedValue('ok')
    const deduped = dedupeNoErrorCache(fn)

    const [a, b] = await Promise.all([deduped('1'), deduped('1')])

    expect(a).toBe('ok')
    expect(b).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('실패 후 재시도 가능', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok')

    const deduped = dedupeNoErrorCache(fn)

    await expect(deduped('1')).rejects.toThrow('fail')
    expect(await deduped('1')).toBe('ok') // 새로 실행
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
