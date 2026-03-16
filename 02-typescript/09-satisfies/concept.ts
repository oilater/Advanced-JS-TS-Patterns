/**
 * TS 패턴 9: satisfies — 타입 검증하되 추론은 유지
 * 난이도: ★☆☆
 *
 * 핵심: "이 타입을 만족하는지 검증하되, 더 구체적인 타입 추론은 유지"
 *
 * 타입 어노테이션 → 추론이 넓어짐
 * satisfies       → 검증 + 좁은 추론 유지
 */

// ============================================================
// 비교: 타입 어노테이션 vs satisfies
// ============================================================

// 방법 1: 타입 어노테이션 — 추론이 넓어짐
const colorsBad: Record<string, string> = {
  red: '#ff0000',
  green: '#00ff00',
}
// colorsBad.red   → string (구체적 값을 모름)
// colorsBad.blue  → 에러 안 남! (Record<string, string>이라 아무 키나 됨)

// 방법 2: satisfies — 검증 + 좁은 추론 유지
const colorsGood = {
  red: '#ff0000',
  green: '#00ff00',
} satisfies Record<string, string>
// colorsGood.red   → '#ff0000' (리터럴 타입!)
// colorsGood.blue  → 에러! (red, green만 있으니까)

// ============================================================
// Vitest 실제 코드
// ============================================================

// 1. packages/runner/src/fixture.ts:35
interface TestContext {
  task: unknown
  signal: AbortSignal
  onTestFailed: () => void
  onTestFinished: () => void
  skip: () => void
  annotate: () => void
}

const builtinFixtures: string[] = [
  'task',
  'signal',
  'onTestFailed',
  'onTestFinished',
  'skip',
  'annotate',
] satisfies (keyof TestContext)[]
// 배열의 모든 값이 TestContext의 실제 키인지 컴파일 타임에 검증!
// 'task'가 TestContext에 없으면 에러!

// 2. packages/integrations/chai/poll.ts:162
// Promise 인터페이스를 만족하는지 검증
// { then, catch, finally, [Symbol.toStringTag] } satisfies Promise<void>

export { colorsGood, builtinFixtures }
