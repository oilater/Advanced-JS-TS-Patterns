import { describe, it, expect } from 'vitest'
import { manualPromise, withTimeout } from './exercise'

describe('manualPromise', () => {
  it('외부에서 resolve로 값을 전달', async () => {
    const { promise, resolve } = manualPromise()
    setTimeout(() => resolve('hello'), 10)
    expect(await promise).toBe('hello')
  })

  it('resolve 전에는 pending 상태', async () => {
    const { promise, resolve } = manualPromise()
    let resolved = false
    promise.then(() => { resolved = true })

    await new Promise((r) => setTimeout(r, 20))
    expect(resolved).toBe(false) // 아직 resolve 안 함

    resolve('done')
    await promise
    expect(resolved).toBe(true)
  })
})

describe('withTimeout', () => {
  it('시간 내 완료되면 결과 반환', async () => {
    const fast = new Promise<string>((r) => setTimeout(() => r('ok'), 10))
    expect(await withTimeout(fast, 1000)).toBe('ok')
  })

  it('시간 초과하면 reject', async () => {
    const slow = new Promise<string>((r) => setTimeout(() => r('late'), 5000))
    await expect(withTimeout(slow, 30)).rejects.toThrow()
  })
})
