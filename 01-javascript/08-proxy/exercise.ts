// Proxy 과제

/**
 * 과제 1: 변경 감지 Proxy — set 시 콜백 호출
 *
 * const state = onChange({ count: 0, name: 'kim' }, (key, value, oldValue) => {
 *   console.log(`${key}: ${oldValue} → ${value}`)
 * })
 * state.count = 1    // 콘솔: "count: 0 → 1"
 * state.name = 'lee' // 콘솔: "name: kim → lee"
 */
export function onChange<T extends object>(
  target: T,
  callback: (key: string, value: any, oldValue: any) => void,
): T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 접근 로깅 Proxy — get 시 접근 기록
 *
 * const user = withAccessLog({ name: 'kim', age: 25 })
 * user.name             // 'kim'
 * user.age              // 25
 * user.name             // 'kim'
 * user._accessLog       → ['name', 'age', 'name']
 * // _accessLog 자체 접근은 기록하지 않음
 */
export function withAccessLog<T extends object>(
  target: T,
): T & { _accessLog: string[] } {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: 읽기 전용 + 기본값 Proxy
 *
 * const obj = readonlyWithDefaults({ port: 3000 }, { host: 'localhost' })
 * obj.port       → 3000        (target에서)
 * obj.host       → 'localhost'  (defaults에서)
 * obj.port = 999 → Error!      (쓰기 불가)
 */
export function readonlyWithDefaults<T extends object>(
  target: T,
  defaults: Partial<T>,
): Readonly<T> {
  throw new Error('구현해보세요!')
}
