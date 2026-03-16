import { describe, it, expect } from 'vitest'
import { printLength, getKeys } from './exercise'

describe('printLength', () => {
  it('문자열 길이 반환', () => {
    expect(printLength('hello')).toBe(5)
    expect(printLength('')).toBe(0)
  })
})

describe('getKeys', () => {
  it('객체의 키를 배열로 반환', () => {
    const keys = getKeys({ a: 1, b: 2, c: 3 })
    expect(keys.sort()).toEqual(['a', 'b', 'c'])
  })

  it('빈 객체면 빈 배열', () => {
    expect(getKeys({})).toEqual([])
  })
})
