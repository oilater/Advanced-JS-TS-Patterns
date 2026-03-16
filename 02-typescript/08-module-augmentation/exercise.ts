/**
 * 모듈 확장 — 직접 만들어보기
 */

// ============================================================
// 과제 1: 글로벌 Window 타입에 커스텀 속성 추가
// ============================================================

declare global {
  interface Window {
    // TODO: featureFlags 객체 추가
    // featureFlags: { [key: string]: boolean }
  }
}

// window.featureFlags.darkMode // 타입 에러 없어야 함

// ============================================================
// 과제 2: 기존 인터페이스 확장 패턴 이해
// ============================================================

// 라이브러리 역할 (변경 불가)
interface BaseConfig {
  debug: boolean
}

// 앱에서 확장 (모듈 확장과 같은 원리)
interface BaseConfig {
  // TODO: appName과 version 필드 추가
  // TypeScript에서 같은 이름의 interface는 자동으로 병합됨!
}

// const config: BaseConfig = {
//   debug: true,
//   appName: 'MyApp',   // OK!
//   version: '1.0.0',   // OK!
// }

export {}
