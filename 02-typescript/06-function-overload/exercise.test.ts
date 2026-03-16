import { describe, it, expect } from 'vitest'
import { parse, wrap } from './exercise'

describe('parse', () => {
  it('string → number', () => {
    expect(parse('42')).toBe(42)
    expect(parse('3.14')).toBeCloseTo(3.14)
  })

  it('number → string', () => {
    expect(parse(42)).toBe('42')
    expect(parse(0)).toBe('0')
  })
})

describe('wrap', () => {
  it('단일 값을 배열로 감싸기', () => {
    expect(wrap(1)).toEqual([1])
    expect(wrap('hello')).toEqual(['hello'])
  })

  it('배열은 그대로', () => {
    expect(wrap([1, 2])).toEqual([1, 2])
    expect(wrap(['a'])).toEqual(['a'])
  })
})
