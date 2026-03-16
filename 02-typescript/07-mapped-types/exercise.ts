/**
 * Mapped Types — 직접 만들어보기
 */

// ============================================================
// 과제 1: 모든 프로퍼티를 getter로 변환
// ============================================================

type Getters<T> = {
  // TODO: name → getName, age → getAge 형태로 변환
  // 힌트: `as `get${Capitalize<string & K>}`` 사용
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

interface Person {
  name: string
  age: number
}
type PersonGetters = Getters<Person>
// → { getName: () => string; getAge: () => number }

// ============================================================
// 과제 2: 특정 타입의 프로퍼티만 추출
// ============================================================

type PickByType<T, ValueType> = {
  // TODO: 값이 ValueType인 프로퍼티만 남기기
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K]
}

interface Mixed {
  a: string
  b: number
  c: string
  d: boolean
}
type StringProps = PickByType<Mixed, string>
// → { a: string; c: string }

// ============================================================
// 과제 3: 이벤트 핸들러 타입 자동 생성
// ============================================================

type EventHandlers<T> = {
  // TODO: 각 키에 대해 on + 대문자 시작 핸들러 생성
  // { count: number } → { onCount: (value: number) => void }
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void
}

interface State {
  count: number
  name: string
  loading: boolean
}
type StateHandlers = EventHandlers<State>
// → { onCount: (value: number) => void; onName: (value: string) => void; onLoading: (value: boolean) => void }

export type { Getters, PickByType, EventHandlers }
