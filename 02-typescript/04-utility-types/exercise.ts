/**
 * Utility Types — 직접 만들어보기
 */

interface Config {
  host: string
  port: number
  database: string
  password: string
  debug: boolean
  logLevel: 'info' | 'warn' | 'error'
}

// ============================================================
// 과제 1: 비밀번호를 제외한 설정 (로깅용)
// ============================================================
type SafeConfig = Omit<Config, 'password'>

// ============================================================
// 과제 2: 설정 업데이트 함수 — 일부만 변경 가능
// ============================================================
function updateConfig(current: Config, updates: Partial<Config>): Config {
  // TODO: 불변성 유지하면서 업데이트 (spread 사용)
  throw new Error('구현해보세요!')
}

// ============================================================
// 과제 3: 읽기 전용 설정
// ============================================================
type FrozenConfig = Readonly<Config>

// ============================================================
// 과제 4: 여러 환경의 설정을 담는 타입
// ============================================================
type Environment = 'dev' | 'staging' | 'prod'
type AllConfigs = Record<Environment, Config>

// ============================================================
// 과제 5: 데이터베이스 연결에 필요한 것만 추출
// ============================================================
type DbConfig = Pick<Config, 'host' | 'port' | 'database' | 'password'>

export { updateConfig }
export type { SafeConfig, FrozenConfig, AllConfigs, DbConfig }
