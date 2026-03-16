/**
 * 판별 유니온 — 직접 만들어보기
 */

// ============================================================
// 과제: 파일 시스템 이벤트를 판별 유니온으로 설계
// ============================================================

interface FileCreated {
  type: 'created'
  path: string
  content: string
}
interface FileModified {
  type: 'modified'
  path: string
  oldContent: string
  newContent: string
}
interface FileDeleted {
  type: 'deleted'
  path: string
}

type FileEvent = FileCreated | FileModified | FileDeleted

function describeEvent(event: FileEvent): string {
  // TODO: switch/case로 각 타입별 설명 반환
  // TypeScript가 각 case에서 올바른 프로퍼티만 접근 허용하는지 확인!
  throw new Error('구현해보세요!')
}

// 보너스: exhaustive check
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`)
}

// ============================================================
// 보너스 과제: Result 타입 패턴
// ============================================================

type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }

function divide(a: number, b: number): Result<number, string> {
  // TODO: b가 0이면 에러, 아니면 성공
  throw new Error('구현해보세요!')
}

// const result = divide(10, 2)
// if (result.ok) {
//   console.log(result.value)  // number
// } else {
//   console.log(result.error)  // string
// }

export { describeEvent, divide }
