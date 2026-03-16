/**
 * TS 패턴 4: Utility Types — 타입 조합의 레고 블록
 * 난이도: ★★☆
 *
 * TypeScript 내장 유틸리티 타입으로 기존 타입을 변형한다.
 *
 * Partial<T>       — 모든 필드가 optional
 * Required<T>      — 모든 필드가 required
 * Readonly<T>      — 모든 필드가 readonly
 * Pick<T, Keys>    — 특정 필드만 추출
 * Omit<T, Keys>    — 특정 필드만 제외
 * Record<K, V>     — { [key: K]: V }
 */

// ============================================================
// Vitest 실제 코드
// ============================================================

interface TestOptions {
  timeout: number
  retry: number
  shuffle: boolean
  skip: boolean
  tags: string[]
}

// 1. Omit — 필드 제거
// packages/runner/src/types/tasks.ts:476
type TestCollectorOptions = Omit<TestOptions, 'shuffle'>

// Omit + 확장
interface TestTagDefinition extends Omit<TestOptions, 'tags' | 'shuffle'> {
  name: string
  description?: string
  priority?: number
}

// 2. Partial — 상태 업데이트
// packages/expect/src/types.ts:125
interface MatcherState {
  isNot: boolean
  promise: string
  expand: boolean
}
type SetState = (state: Partial<MatcherState>) => void
// 일부 필드만 업데이트 가능 — React의 setState와 같은 패턴!

// 3. Readonly — 불변 보장
// packages/expect/src/types.ts:88
interface Test {
  name: string
  status: string
}
type ReadonlyTest = Readonly<Test>
// 테스트 실행 중에 task 객체를 실수로 수정하는 걸 방지

// 4. Record — 맵핑 객체
// packages/runner/src/types/tasks.ts:182
type SuiteHookKeys = 'beforeAll' | 'afterAll' | 'beforeEach' | 'afterEach'
type TaskState = 'pass' | 'fail' | 'skip'
type HooksRecord = Partial<Record<SuiteHookKeys, TaskState>>

export type {
  TestCollectorOptions,
  TestTagDefinition,
  SetState,
  ReadonlyTest,
  HooksRecord,
}
