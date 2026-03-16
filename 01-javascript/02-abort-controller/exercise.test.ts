import { describe, it, expect } from 'vitest'
import { cancellableDelay, withAutoCancel } from './exercise'

describe('cancellableDelay', () => {
  it('지정된 시간 후 resolve', async () => {
    const start = Date.now()
    await cancellableDelay(50)
    expect(Date.now() - start).toBeGreaterThanOrEqual(40)
  })

  it('signal 없이도 동작한다', async () => {
    await expect(cancellableDelay(10)).resolves.toBeUndefined()
  })

  it('abort 시 즉시 reject', async () => {
    const controller = new AbortController()
    const promise = cancellableDelay(5000, controller.signal)

    setTimeout(() => controller.abort(), 30)

    await expect(promise).rejects.toThrow()
  })

  it('이미 abort된 signal이면 즉시 reject', async () => {
    const controller = new AbortController()
    controller.abort()

    await expect(cancellableDelay(1000, controller.signal)).rejects.toThrow()
  })
})

describe('withAutoCancel', () => {
  it('새 호출 시 이전 호출이 취소된다', async () => {
    let activeCount = 0
    let maxActive = 0

    const fn = withAutoCancel(async (signal) => {
      activeCount++
      maxActive = Math.max(maxActive, activeCount)

      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, 100)
        signal.addEventListener('abort', () => {
          clearTimeout(timer)
          reject(new Error('aborted'))
        })
      })

      activeCount--
      return 'done'
    })

    // 첫 번째 호출 (취소될 것)
    const p1 = fn().catch(() => 'cancelled')
    // 두 번째 호출 (이것만 완료)
    const p2 = fn()

    const [r1, r2] = await Promise.all([p1, p2])
    expect(r1).toBe('cancelled')
    expect(r2).toBe('done')
  })
})
