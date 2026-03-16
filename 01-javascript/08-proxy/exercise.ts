// Proxy 과제

/** 과제 1: 변경 감지 Proxy — set 시 콜백 호출 */
export function onChange<T extends object>(
  target: T,
  callback: (key: string, value: any, oldValue: any) => void,
): T {
  throw new Error('구현해보세요!')
}

/** 과제 2: 접근 로깅 Proxy — get 시 접근 기록 */
export function withAccessLog<T extends object>(
  target: T,
): T & { _accessLog: string[] } {
  // _accessLog 자체에 접근할 때는 기록하지 않음
  throw new Error('구현해보세요!')
}

/** 과제 3: 읽기 전용 + 기본값 Proxy */
export function readonlyWithDefaults<T extends object>(
  target: T,
  defaults: Partial<T>,
): Readonly<T> {
  // get: target에 없으면 defaults에서 반환
  // set: 항상 에러
  throw new Error('구현해보세요!')
}
