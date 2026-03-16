// 모듈 확장 과제 — 이 과제는 타입 레벨만 (런타임 테스트 없음)
// concept.ts를 읽고 패턴을 이해하세요.
// tsconfig의 strict 모드에서 타입 에러가 없으면 통과!

declare global {
  interface Window {
    featureFlags: Record<string, boolean>
  }
}

// 인터페이스 병합 패턴
interface AppConfig {
  debug: boolean
}

interface AppConfig {
  appName: string
  version: string
}

// 이 코드에 타입 에러가 없으면 성공!
const config: AppConfig = {
  debug: true,
  appName: 'MyApp',
  version: '1.0.0',
}

export { config }
