/**
 * TS 패턴 2: 타입 가드 (Type Guard) — 런타임 체크로 타입 좁히기
 * 난이도: ★★☆
 *
 * unknown이나 유니온 타입을 안전하게 좁히는 방법.
 * `is` 키워드가 핵심.
 */

// ============================================================
// 기본: is 키워드의 효과
// ============================================================

// 일반 함수 — TypeScript가 타입을 못 좁힘
function isStringBad(x: unknown): boolean {
  return typeof x === 'string'
}

// 타입 가드 — is 키워드로 타입 좁히기
function isString(x: unknown): x is string {
  return typeof x === 'string'
}

function demo(value: unknown) {
  if (isString(value)) {
    value.toUpperCase() // OK! value가 string으로 좁혀짐
  }
}

// ============================================================
// Vitest 실제 코드
// ============================================================

// Mock 함수 확인 — packages/spy/src/index.ts:17
interface Mock extends Function {
  _isMockFunction: boolean
  mockReset(): void
}

function isMockFunction(fn: any): fn is Mock {
  return (
    typeof fn === 'function' && '_isMockFunction' in fn && fn._isMockFunction === true
  )
}

// 사용처:
function resetIfMock(something: unknown) {
  if (isMockFunction(something)) {
    something.mockReset() // Mock 타입의 메서드 접근 가능!
  }
}

// 객체 리터럴 확인 — packages/expect/src/jest-utils.ts:392
function isObjectLiteral(source: unknown): source is Record<string, unknown> {
  return source != null && typeof source === 'object' && !Array.isArray(source)
}

// `in` 연산자로 타입 좁히기 — Vitest 전반에서 사용
const FIXTURE_KEY = Symbol.for('FIXTURE')
function hasFixture(fn: Function): fn is Function & { [key: symbol]: Error } {
  return FIXTURE_KEY in fn
}

export { isString, isMockFunction, isObjectLiteral }
