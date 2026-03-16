import { describe, it, expect } from 'vitest'
import { createDefer, TaskQueue, createBarrier } from './exercise'

describe('createDefer', () => {
  it('외부에서 resolve 가능', async () => {
    const defer = createDefer<string>()
    setTimeout(() => defer.resolve('hello'), 10)
    expect(await defer).toBe('hello')
  })

  it('외부에서 reject 가능', async () => {
    const defer = createDefer<string>()
    setTimeout(() => defer.reject(new Error('boom')), 10)
    await expect(defer).rejects.toThrow('boom')
  })

  it('Promise처럼 then 체이닝 가능', async () => {
    const defer = createDefer<number>()
    const doubled = defer.then((x) => x * 2)
    defer.resolve(21)
    expect(await doubled).toBe(42)
  })
})

describe('TaskQueue', () => {
  it('enqueue한 작업을 processNext로 처리', async () => {
    const queue = new TaskQueue<number>()
    const p1 = queue.enqueue(async () => 42)
    const p2 = queue.enqueue(async () => 100)

    expect(queue.size).toBe(2)

    await queue.processNext()
    expect(await p1).toBe(42)

    await queue.processNext()
    expect(await p2).toBe(100)

    expect(queue.size).toBe(0)
  })

  it('작업이 실패하면 해당 Promise가 reject', async () => {
    const queue = new TaskQueue<string>()
    const p = queue.enqueue(async () => { throw new Error('fail') })

    await queue.processNext()
    await expect(p).rejects.toThrow('fail')
  })
})

describe('createBarrier', () => {
  it('count만큼 호출되면 모두 resolve', async () => {
    const barrier = createBarrier(3)
    const results: string[] = []

    const p1 = barrier().then(() => results.push('a'))
    const p2 = barrier().then(() => results.push('b'))
    // 아직 2개만 호출 — 아무도 resolve 안 됨

    await new Promise((r) => setTimeout(r, 30))
    expect(results).toEqual([])

    const p3 = barrier().then(() => results.push('c'))
    // 3번째 호출 → 모두 resolve
    await Promise.all([p1, p2, p3])
    expect(results).toHaveLength(3)
  })
})
