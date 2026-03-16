/**
 * TS 패턴 3: 판별 유니온 (Discriminated Union)
 * 난이도: ★★☆
 *
 * 유니온 타입에 공통 필드(보통 type or kind)를 넣어서
 * TypeScript가 자동으로 좁히게 하는 패턴.
 */

// ============================================================
// Vitest 실제 코드: Mock 결과 타입
// packages/spy/src/types.ts:1
// ============================================================

interface MockResultReturn<T> {
  type: 'return'
  value: T
}
interface MockResultIncomplete {
  type: 'incomplete'
  value: undefined
}
interface MockResultThrow {
  type: 'throw'
  value: any
}

type MockResult<T> = MockResultReturn<T> | MockResultThrow | MockResultIncomplete

// switch + type 필드만으로 각 case에서 정확한 타입!
function handleResult<T>(result: MockResult<T>) {
  switch (result.type) {
    case 'return':
      console.log(result.value) // T 타입
      break
    case 'throw':
      console.error(result.value) // any
      break
    case 'incomplete':
      console.log('아직 안 끝남') // value는 undefined
      break
  }
}

// ============================================================
// 새 타입 추가하면 빠뜨릴 수 없음!
// ============================================================

// exhaustive check 함수
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`)
}

// 새 타입 추가 후 switch에서 case 안 넣으면 TypeScript가 경고!
// → 빠뜨릴 수가 없음

export { MockResult, handleResult, assertNever }
