import { describe, it, expect } from 'vitest'
import { updateConfig, toDbConfig, getConfig } from './exercise'
import type { AllConfigs } from './exercise'

const baseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  password: 'secret',
  debug: true,
  logLevel: 'info' as const,
}

describe('updateConfig', () => {
  it('일부 필드만 업데이트', () => {
    const result = updateConfig(baseConfig, { port: 3000 })
    expect(result.port).toBe(3000)
    expect(result.host).toBe('localhost') // 나머지 유지
  })

  it('원본을 변경하지 않음', () => {
    const original = { ...baseConfig }
    updateConfig(baseConfig, { port: 9999 })
    expect(baseConfig.port).toBe(original.port)
  })
})

describe('toDbConfig', () => {
  it('DB 관련 필드만 추출', () => {
    const db = toDbConfig(baseConfig)
    expect(db).toEqual({
      host: 'localhost',
      port: 5432,
      database: 'mydb',
      password: 'secret',
    })
  })

  it('debug, logLevel은 포함하지 않음', () => {
    const db = toDbConfig(baseConfig) as any
    expect(db.debug).toBeUndefined()
    expect(db.logLevel).toBeUndefined()
  })
})

describe('getConfig', () => {
  const configs: AllConfigs = {
    dev: { ...baseConfig, debug: true },
    staging: { ...baseConfig, debug: false, host: 'staging.db' },
    prod: { ...baseConfig, debug: false, host: 'prod.db', password: 'prod-secret' },
  }

  it('환경별 설정 반환', () => {
    expect(getConfig(configs, 'dev').debug).toBe(true)
    expect(getConfig(configs, 'prod').host).toBe('prod.db')
  })
})
