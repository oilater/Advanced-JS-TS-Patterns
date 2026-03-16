import { describe, it, expect } from 'vitest'
import { last, merge, Stack, pluck } from './exercise'

describe('last', () => {
  it('마지막 요소 반환', () => {
    expect(last([1, 2, 3])).toBe(3)
    expect(last(['a', 'b'])).toBe('b')
  })

  it('빈 배열이면 undefined', () => {
    expect(last([])).toBeUndefined()
  })
})

describe('merge', () => {
  it('두 객체를 병합', () => {
    const result = merge({ name: 'kim' }, { age: 25 })
    expect(result).toEqual({ name: 'kim', age: 25 })
  })

  it('원본 객체를 변경하지 않음', () => {
    const a = { x: 1 }
    const b = { y: 2 }
    const result = merge(a, b)

    expect(result).not.toBe(a)
    expect(result).not.toBe(b)
  })
})

describe('Stack', () => {
  it('push/pop LIFO 순서', () => {
    const s = new Stack<number>()
    s.push(1)
    s.push(2)
    s.push(3)

    expect(s.pop()).toBe(3)
    expect(s.pop()).toBe(2)
    expect(s.pop()).toBe(1)
  })

  it('peek은 제거하지 않음', () => {
    const s = new Stack<string>()
    s.push('a')

    expect(s.peek()).toBe('a')
    expect(s.size).toBe(1)
  })

  it('빈 스택에서 pop/peek은 undefined', () => {
    const s = new Stack<number>()
    expect(s.pop()).toBeUndefined()
    expect(s.peek()).toBeUndefined()
  })
})

describe('pluck', () => {
  it('객체 배열에서 특정 키의 값만 추출', () => {
    const users = [
      { name: 'kim', age: 25 },
      { name: 'lee', age: 30 },
    ]
    expect(pluck(users, 'name')).toEqual(['kim', 'lee'])
    expect(pluck(users, 'age')).toEqual([25, 30])
  })

  it('빈 배열이면 빈 배열', () => {
    expect(pluck([], 'x' as never)).toEqual([])
  })
})
