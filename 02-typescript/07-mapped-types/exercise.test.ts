import { describe, it, expect } from 'vitest'
import { createGetters, updateField } from './exercise'

describe('createGetters', () => {
  it('각 프로퍼티의 getter 생성', () => {
    const getters = createGetters({ name: 'kim', age: 25 })

    expect(getters.getName()).toBe('kim')
    expect(getters.getAge()).toBe(25)
  })

  it('빈 객체면 빈 결과', () => {
    const getters = createGetters({})
    expect(Object.keys(getters)).toHaveLength(0)
  })
})

describe('updateField', () => {
  it('특정 필드만 업데이트 (불변)', () => {
    const user = { name: 'kim', age: 25 }
    const updated = updateField(user, 'name', 'lee')

    expect(updated).toEqual({ name: 'lee', age: 25 })
    expect(user.name).toBe('kim') // 원본 불변
  })

  it('원본과 다른 참조', () => {
    const obj = { x: 1 }
    const updated = updateField(obj, 'x', 2)
    expect(updated).not.toBe(obj)
  })
})
