import { describe, it, expect } from 'vitest'
import { updateField, toBooleanFlags } from './exercise'

describe('updateField', () => {
  it('특정 필드만 업데이트', () => {
    const user = { name: 'kim', age: 25 }
    const result = updateField(user, 'name', 'lee')
    expect(result).toEqual({ name: 'lee', age: 25 })
  })

  it('원본 불변', () => {
    const obj = { x: 1 }
    updateField(obj, 'x', 2)
    expect(obj.x).toBe(1)
  })
})

describe('toBooleanFlags', () => {
  it('truthy/falsy 변환', () => {
    const result = toBooleanFlags({ name: 'kim', age: 0, active: true })
    expect(result).toEqual({ name: true, age: false, active: true })
  })

  it('빈 문자열은 false', () => {
    const result = toBooleanFlags({ value: '' })
    expect(result).toEqual({ value: false })
  })
})
