import { describe, it, expect } from 'vitest'
import { identity, toArray, pair } from './exercise'

describe('identity', () => {
  it('숫자를 그대로 반환', () => {
    expect(identity(42)).toBe(42)
  })

  it('문자열을 그대로 반환', () => {
    expect(identity('hello')).toBe('hello')
  })

  it('객체를 그대로 반환 (같은 참조)', () => {
    const obj = { a: 1 }
    expect(identity(obj)).toBe(obj)
  })
})

describe('toArray', () => {
  it('값을 배열로 감싼다', () => {
    expect(toArray(1)).toEqual([1])
    expect(toArray('hello')).toEqual(['hello'])
  })
})

describe('pair', () => {
  it('두 값을 튜플로 반환', () => {
    expect(pair(1, 'hello')).toEqual([1, 'hello'])
    expect(pair('a', true)).toEqual(['a', true])
  })
})
