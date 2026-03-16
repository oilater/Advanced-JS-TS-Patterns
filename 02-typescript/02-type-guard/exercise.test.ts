import { describe, it, expect } from 'vitest'
import { isSuccess, isError, isNotNullish, hasProperty, type ApiResponse } from './exercise'

describe('isSuccess', () => {
  it('성공 응답이면 true', () => {
    const res: ApiResponse = { status: 'ok', data: [1, 2, 3] }
    expect(isSuccess(res)).toBe(true)
  })

  it('에러 응답이면 false', () => {
    const res: ApiResponse = { status: 'error', message: 'fail' }
    expect(isSuccess(res)).toBe(false)
  })
})

describe('isError', () => {
  it('에러 응답이면 true', () => {
    const res: ApiResponse = { status: 'error', message: 'oops' }
    expect(isError(res)).toBe(true)
  })

  it('성공 응답이면 false', () => {
    const res: ApiResponse = { status: 'ok', data: null }
    expect(isError(res)).toBe(false)
  })
})

describe('isNotNullish', () => {
  it('값이 있으면 true', () => {
    expect(isNotNullish(0)).toBe(true)
    expect(isNotNullish('')).toBe(true)
    expect(isNotNullish(false)).toBe(true)
  })

  it('null/undefined면 false', () => {
    expect(isNotNullish(null)).toBe(false)
    expect(isNotNullish(undefined)).toBe(false)
  })

  it('filter와 함께 사용 가능', () => {
    const arr = [1, null, 2, undefined, 3]
    const result = arr.filter(isNotNullish)
    expect(result).toEqual([1, 2, 3])
  })
})

describe('hasProperty', () => {
  it('프로퍼티가 있으면 true', () => {
    expect(hasProperty({ name: 'kim' }, 'name')).toBe(true)
  })

  it('프로퍼티가 없으면 false', () => {
    expect(hasProperty({ name: 'kim' }, 'age')).toBe(false)
  })

  it('값이 undefined여도 키가 있으면 true', () => {
    expect(hasProperty({ x: undefined }, 'x')).toBe(true)
  })
})
