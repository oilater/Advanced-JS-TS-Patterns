import { describe, it, expect } from 'vitest'
import { transition, hasPermission } from './exercise'

describe('transition', () => {
  it('IDLE → LOADING on fetch', () => {
    expect(transition('idle', 'fetch')).toBe('loading')
  })

  it('LOADING → SUCCESS on resolve', () => {
    expect(transition('loading', 'resolve')).toBe('success')
  })

  it('LOADING → ERROR on reject', () => {
    expect(transition('loading', 'reject')).toBe('error')
  })

  it('SUCCESS → IDLE on reset', () => {
    expect(transition('success', 'reset')).toBe('idle')
  })

  it('ERROR → IDLE on reset', () => {
    expect(transition('error', 'reset')).toBe('idle')
  })

  it('알 수 없는 action이면 현재 상태 유지', () => {
    expect(transition('idle', 'unknown')).toBe('idle')
  })
})

describe('hasPermission', () => {
  it('권한이 있으면 true', () => {
    expect(hasPermission(['read', 'write'], 'read')).toBe(true)
  })

  it('권한이 없으면 false', () => {
    expect(hasPermission(['read'], 'admin')).toBe(false)
  })

  it('빈 배열이면 항상 false', () => {
    expect(hasPermission([], 'read')).toBe(false)
  })
})
