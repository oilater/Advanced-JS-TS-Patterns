import { describe, it, expect, vi } from 'vitest'
import { weakMemoize, MetadataStore } from './exercise'

describe('weakMemoize', () => {
  it('같은 객체 참조면 캐시된 결과 반환', () => {
    const fn = vi.fn((arr: number[]) => arr.reduce((a, b) => a + b, 0))
    const memoized = weakMemoize(fn)

    const arr = [1, 2, 3]
    expect(memoized(arr)).toBe(6)
    expect(memoized(arr)).toBe(6)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('다른 참조면 새로 실행', () => {
    const fn = vi.fn((obj: { n: number }) => obj.n * 2)
    const memoized = weakMemoize(fn)

    expect(memoized({ n: 5 })).toBe(10)
    expect(memoized({ n: 5 })).toBe(10) // 다른 참조!
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('MetadataStore', () => {
  it('메타데이터 저장/조회', () => {
    const store = new MetadataStore<object, number>()
    const obj = { name: 'test' }

    store.set(obj, 42)
    expect(store.get(obj)).toBe(42)
    expect(store.has(obj)).toBe(true)
  })

  it('저장하지 않은 객체는 undefined', () => {
    const store = new MetadataStore<object, string>()
    expect(store.get({})).toBeUndefined()
    expect(store.has({})).toBe(false)
  })

  it('서로 다른 객체에 독립적으로 저장', () => {
    const store = new MetadataStore<object, string>()
    const a = {}
    const b = {}

    store.set(a, 'alpha')
    store.set(b, 'beta')

    expect(store.get(a)).toBe('alpha')
    expect(store.get(b)).toBe('beta')
  })
})
