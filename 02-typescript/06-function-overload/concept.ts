/**
 * TS 패턴 6: 함수 오버로드 — 하나의 함수, 여러 시그니처
 * 난이도: ★★☆
 *
 * 같은 함수인데 인자 조합에 따라 다른 타입을 반환하고 싶을 때.
 */

// ============================================================
// 기본
// ============================================================

// 오버로드 시그니처 (타입만 선언)
function parse(input: string): number
function parse(input: number): string
// 구현 시그니처 (실제 로직)
function parse(input: string | number): number | string {
  if (typeof input === 'string') return Number(input)
  return String(input)
}

parse('42') // 반환 타입: number
parse(42) // 반환 타입: string

// ============================================================
// Vitest 실제 코드
// ============================================================

// 1. withImplementation — packages/spy/src/types.ts:287
// 콜백이 async면 Promise<Mock> 반환, sync면 Mock 반환

interface MockInstance {
  name: string
}

// 사용할 때 TypeScript가 자동으로 구분:
// mock.withImplementation(() => 42, () => { ... })     → MockInstance
// mock.withImplementation(() => 42, async () => { ... }) → Promise<MockInstance>

// 2. test.for — 옵션 유무에 따른 오버로드
// packages/runner/src/types/tasks.ts:408
// test.for([1, 2, 3])('test %s', (num) => { ... })
// test.for([1, 2, 3])('test %s', { timeout: 5000 }, (num) => { ... })

export { parse }
