import { describe, it, expect } from 'vitest'
import { unwrap, deepFreeze } from './exercise'

describe('unwrap', () => {
  it('Promise 값을 벗긴다', async () => {
    expect(await unwrap(Promise.resolve(42))).toBe(42)
  })

  it('일반 값은 그대로', async () => {
    expect(await unwrap(42)).toBe(42)
  })

  it('문자열도 동작', async () => {
    expect(await unwrap('hello')).toBe('hello')
    expect(await unwrap(Promise.resolve('hello'))).toBe('hello')
  })
})

describe('deepFreeze', () => {
  it('최상위 프로퍼티 변경 불가', () => {
    const obj = deepFreeze({ a: 1, b: 2 })
    expect(() => { (obj as any).a = 999 }).toThrow()
  })

  it('중첩 프로퍼티도 변경 불가', () => {
    const obj = deepFreeze({ nested: { value: 10 } })
    expect(() => { (obj as any).nested.value = 999 }).toThrow()
  })

  it('값은 그대로 읽힌다', () => {
    const obj = deepFreeze({ x: 1, y: { z: 2 } })
    expect((obj as any).x).toBe(1)
    expect((obj as any).y.z).toBe(2)
  })
})
