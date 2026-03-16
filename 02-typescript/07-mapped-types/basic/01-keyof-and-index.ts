/**
 * 기초 1: keyof와 인덱스 타입
 *
 * Mapped Types를 이해하려면 keyof와 인덱스 접근을 먼저 알아야 한다.
 */

// ============================================================
// keyof — 객체 타입의 키를 유니온으로 추출
// ============================================================

interface User {
  name: string
  age: number
  email: string
}

type UserKeys = keyof User
// → 'name' | 'age' | 'email'

// keyof를 제네릭과 함께 사용
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user: User = { name: 'kim', age: 25, email: 'kim@test.com' }
const name1 = getProperty(user, 'name') // string
const age = getProperty(user, 'age') // number
// getProperty(user, 'invalid')  // Error! 'invalid'는 keyof User가 아님

// ============================================================
// T[K] — 인덱스 접근 타입
// ============================================================

type NameType = User['name'] // string
type AgeType = User['age'] // number

// 유니온으로도 접근 가능
type NameOrAge = User['name' | 'age'] // string | number

// ============================================================
// [K in keyof T] — Mapped Type의 기본
// ============================================================

// for (const K in T) 의 타입 버전!

// 예: 모든 프로퍼티를 string으로 변환
type Stringify<T> = {
  [K in keyof T]: string
}

type StringifiedUser = Stringify<User>
// → { name: string; age: string; email: string }

// 예: 모든 프로퍼티를 optional로
type Optional<T> = {
  [K in keyof T]?: T[K]
}

type OptionalUser = Optional<User>
// → { name?: string; age?: number; email?: string }

// ============================================================
// 과제 1: keyof로 안전한 업데이트 함수
// ============================================================

function updateField<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
): T {
  // TODO: 불변성 유지하면서 특정 필드만 업데이트
  throw new Error('구현해보세요!')
}

// const user = { name: 'kim', age: 25 }
// updateField(user, 'name', 'lee')  // OK
// updateField(user, 'age', 30)      // OK
// updateField(user, 'name', 123)    // Error! name은 string이어야 함
// updateField(user, 'invalid', 'x') // Error! invalid는 User의 키가 아님

// ============================================================
// 과제 2: 모든 값을 boolean으로 변환하는 타입
// ============================================================

type BooleanFlags<T> = {
  // TODO: [K in keyof T] 사용
  [K in keyof T]: boolean
}

type UserFlags = BooleanFlags<User>
// → { name: boolean; age: boolean; email: boolean }

// ============================================================
// 과제 3: readonly를 제거하는 타입
// ============================================================

type Mutable<T> = {
  // TODO: -readonly 사용
  -readonly [K in keyof T]: T[K]
}

interface ReadonlyUser {
  readonly name: string
  readonly age: number
}

type MutableUser = Mutable<ReadonlyUser>
// → { name: string; age: number }  (readonly 제거됨)

export { updateField }
export type { BooleanFlags, Mutable }
