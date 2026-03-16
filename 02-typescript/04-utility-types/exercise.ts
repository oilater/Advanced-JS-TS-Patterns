// Utility Types 과제

interface Config {
  host: string
  port: number
  database: string
  password: string
  debug: boolean
  logLevel: 'info' | 'warn' | 'error'
}

/** 과제 1: 비밀번호 제외한 로깅용 타입 */
export type SafeConfig = Omit<Config, 'password'>

/** 과제 2: 불변 업데이트 함수 */
export function updateConfig(current: Config, updates: Partial<Config>): Config {
  throw new Error('구현해보세요!')
}

/** 과제 3: DB 연결에 필요한 것만 추출하는 타입 + 함수 */
export type DbConfig = Pick<Config, 'host' | 'port' | 'database' | 'password'>

export function toDbConfig(config: Config): DbConfig {
  throw new Error('구현해보세요!')
}

/** 과제 4: 환경별 설정 맵 */
export type Environment = 'dev' | 'staging' | 'prod'
export type AllConfigs = Record<Environment, Config>

export function getConfig(configs: AllConfigs, env: Environment): Readonly<Config> {
  throw new Error('구현해보세요!')
}
