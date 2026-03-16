// Utility Types 과제

interface Config {
  host: string
  port: number
  database: string
  password: string
  debug: boolean
  logLevel: 'info' | 'warn' | 'error'
}

export type SafeConfig = Omit<Config, 'password'>

/**
 * 과제 1: 일부 필드만 업데이트 (불변)
 *
 * updateConfig(config, { port: 3000 })
 * → { ...config, port: 3000 }  (원본 변경 없음)
 */
export function updateConfig(current: Config, updates: Partial<Config>): Config {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: DB 관련 필드만 추출
 *
 * toDbConfig(config) → { host, port, database, password }
 * // debug, logLevel은 포함하지 않음
 */
export type DbConfig = Pick<Config, 'host' | 'port' | 'database' | 'password'>

export function toDbConfig(config: Config): DbConfig {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: 환경별 설정 반환
 *
 * getConfig(configs, 'prod') → configs.prod (Readonly)
 */
export type Environment = 'dev' | 'staging' | 'prod'
export type AllConfigs = Record<Environment, Config>

export function getConfig(configs: AllConfigs, env: Environment): Readonly<Config> {
  throw new Error('구현해보세요!')
}
