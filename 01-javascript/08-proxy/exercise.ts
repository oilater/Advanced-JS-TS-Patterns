/**
 * Proxy — 직접 만들어보기
 *
 * 목표: Proxy를 활용한 객체 동작 가로채기를 구현한다.
 */

// ============================================================
// 과제 1: 변경 감지 Proxy
// ============================================================

function onChange<T extends object>(
  target: T,
  callback: (key: string, value: any, oldValue: any) => void,
): T {
  // TODO: set을 가로채서 callback 호출
  // callback에 key, 새 값, 이전 값 전달
  throw new Error('구현해보세요!')
}

// 테스트:
// const state = onChange({ count: 0, name: 'kim' }, (key, value, oldValue) => {
//   console.log(`${key}: ${oldValue} → ${value}`)
// })
// state.count = 1   // "count: 0 → 1"
// state.name = 'lee' // "name: kim → lee"

// ============================================================
// 과제 2: 접근 로깅 Proxy
// ============================================================

function withAccessLog<T extends object>(target: T): T & { _accessLog: string[] } {
  // TODO:
  // - get을 가로채서 접근한 프로퍼티 이름을 _accessLog 배열에 기록
  // - _accessLog 자체에 접근할 때는 기록하지 않음
  throw new Error('구현해보세요!')
}

// 테스트:
// const user = withAccessLog({ name: 'kim', age: 25, email: 'kim@test.com' })
// console.log(user.name)  // 'kim'
// console.log(user.age)   // 25
// console.log(user.name)  // 'kim'
// console.log(user._accessLog) // ['name', 'age', 'name']

// ============================================================
// 과제 3: 깊은 Proxy (중첩 객체도 감지)
// ============================================================

function deepOnChange<T extends object>(
  target: T,
  callback: (path: string, value: any) => void,
): T {
  // TODO:
  // - 중첩 객체도 Proxy로 감쌈
  // - path는 "a.b.c" 형태로 전달
  // 힌트: get에서 반환값이 객체면 재귀적으로 Proxy 적용
  throw new Error('구현해보세요!')
}

// 테스트:
// const state = deepOnChange({
//   user: { name: 'kim', address: { city: 'seoul' } }
// }, (path, value) => {
//   console.log(`${path} = ${value}`)
// })
// state.user.name = 'lee'           // "user.name = lee"
// state.user.address.city = 'busan' // "user.address.city = busan"

export { onChange, withAccessLog, deepOnChange }
