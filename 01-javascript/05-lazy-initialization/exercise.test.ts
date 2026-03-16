import { describe, it, expect, vi } from 'vitest'
import { Lazy, lazyInit, LazyMap } from './exercise'

describe('Lazy', () => {
  it('첫 접근에만 factory 실행', () => {
    const factory = vi.fn(() => 42)
    const lazy = new Lazy(factory)

    expect(factory).not.toHaveBeenCalled()
    expect(lazy.value).toBe(42)
    expect(lazy.value).toBe(42)
    expect(factory).toHaveBeenCalledTimes(1)
  })

  it('factory가 undefined를 반환해도 캐시', () => {
    const factory = vi.fn(() => undefined)
    const lazy = new Lazy(factory)

    lazy.value
    lazy.value
    expect(factory).toHaveBeenCalledTimes(1)
  })
})

describe('lazyInit', () => {
  it('첫 호출에만 factory 실행', () => {
    const factory = vi.fn(() => ({ config: true }))
    const get = lazyInit(factory)

    const a = get()
    const b = get()

    expect(a).toBe(b) // 같은 참조
    expect(factory).toHaveBeenCalledTimes(1)
  })
})

describe('LazyMap', () => {
  it('key별로 독립적으로 초기화', () => {
    const factory = vi.fn((id: string) => ({ id }))
    const map = new LazyMap(factory)

    expect(map.get('a')).toEqual({ id: 'a' })
    expect(map.get('b')).toEqual({ id: 'b' })
    expect(factory).toHaveBeenCalledTimes(2)
  })

  it('같은 key는 캐시', () => {
    const factory = vi.fn((id: string) => ({ id }))
    const map = new LazyMap(factory)

    const first = map.get('a')
    const second = map.get('a')

    expect(first).toBe(second)
    expect(factory).toHaveBeenCalledTimes(1)
  })
})
