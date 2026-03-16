import { describe, it, expect } from 'vitest'
import { trackCalls, CALL_COUNT, NumberRange, markAsValidated, isValidated, IS_VALIDATED } from './exercise'

describe('trackCalls', () => {
  it('호출 횟수를 [CALL_COUNT]로 추적', () => {
    const add = trackCalls((a: number, b: number) => a + b)

    expect(add(1, 2)).toBe(3)
    expect(add(3, 4)).toBe(7)
    expect(add[CALL_COUNT]).toBe(2)
  })

  it('Object.keys에 Symbol이 안 나온다', () => {
    const fn = trackCalls(() => 'hi')
    fn()
    expect(Object.keys(fn)).not.toContain(String(CALL_COUNT))
  })

  it('JSON.stringify에 Symbol이 안 나온다', () => {
    const fn = trackCalls(() => {})
    fn()
    const json = JSON.stringify(fn)
    expect(json).not.toContain('callCount')
  })
})

describe('NumberRange', () => {
  it('for...of로 순회 가능', () => {
    const range = new NumberRange(1, 5)
    const result: number[] = []
    for (const n of range) {
      result.push(n)
    }
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('spread 연산자로 배열 변환', () => {
    expect([...new NumberRange(3, 6)]).toEqual([3, 4, 5, 6])
  })

  it('start === end면 하나만', () => {
    expect([...new NumberRange(5, 5)]).toEqual([5])
  })
})

describe('Symbol.for 플래그', () => {
  it('markAsValidated 후 isValidated가 true', () => {
    const obj = { name: 'kim' }
    expect(isValidated(obj)).toBe(false)

    markAsValidated(obj)
    expect(isValidated(obj)).toBe(true)
  })

  it('JSON.stringify에 플래그가 안 나온다', () => {
    const obj = { name: 'kim' }
    markAsValidated(obj)
    expect(JSON.stringify(obj)).toBe('{"name":"kim"}')
  })

  it('Symbol.for로 만든 같은 키로 접근 가능', () => {
    const obj: any = {}
    markAsValidated(obj)
    // 다른 모듈에서도 같은 Symbol.for 키로 접근 가능
    expect(obj[Symbol.for('IS_VALIDATED')]).toBe(true)
  })
})
