import { describe, it, expect } from 'vitest'
import { routes, theme, getHandler } from './exercise'

describe('satisfies — routes', () => {
  it('라우트가 올바른 구조', () => {
    expect(routes).toHaveLength(3)
    expect(routes[0].method).toBe('GET')
    expect(routes[1].method).toBe('POST')
  })
})

describe('satisfies — theme', () => {
  it('테마 색상이 올바른 구조', () => {
    expect(theme.primary).toBe('#3b82f6')
    expect(theme.danger).toBe('#ef4444')
  })
})

describe('getHandler', () => {
  it('인덱스로 핸들러 반환', () => {
    expect(getHandler(0)).toBe('getUsers')
    expect(getHandler(2)).toBe('updateUser')
  })
})
