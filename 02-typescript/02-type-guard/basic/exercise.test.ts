import { describe, it, expect } from 'vitest'
import { formatValue, total, getLength } from './exercise'

describe('formatValue', () => {
  it('string → 대문자', () => {
    expect(formatValue('hello')).toBe('HELLO')
  })

  it('number → 소수점 2자리', () => {
    expect(formatValue(3.14159)).toBe('3.14')
  })

  it('boolean → Yes/No', () => {
    expect(formatValue(true)).toBe('Yes')
    expect(formatValue(false)).toBe('No')
  })
})

describe('total', () => {
  it('number면 그대로', () => {
    expect(total(5)).toBe(5)
  })

  it('배열이면 합계', () => {
    expect(total([1, 2, 3])).toBe(6)
  })

  it('빈 배열이면 0', () => {
    expect(total([])).toBe(0)
  })
})

describe('getLength', () => {
  it('문자열 길이 반환', () => {
    expect(getLength('hello')).toBe(5)
  })

  it('null이면 0', () => {
    expect(getLength(null)).toBe(0)
  })

  it('undefined면 0', () => {
    expect(getLength(undefined)).toBe(0)
  })

  it('빈 문자열이면 0', () => {
    expect(getLength('')).toBe(0)
  })
})
