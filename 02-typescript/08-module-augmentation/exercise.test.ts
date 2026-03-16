import { describe, it, expect } from 'vitest'
import { config } from './exercise'

describe('모듈 확장', () => {
  it('인터페이스 병합으로 모든 필드 접근 가능', () => {
    expect(config.debug).toBe(true)
    expect(config.appName).toBe('MyApp')
    expect(config.version).toBe('1.0.0')
  })
})
