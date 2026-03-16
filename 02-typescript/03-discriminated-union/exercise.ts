// 판별 유니온 과제

interface FileCreated { type: 'created'; path: string; content: string }
interface FileModified { type: 'modified'; path: string; oldContent: string; newContent: string }
interface FileDeleted { type: 'deleted'; path: string }
export type FileEvent = FileCreated | FileModified | FileDeleted

/**
 * 과제 1: 이벤트 타입별 설명 반환
 *
 * describeEvent({ type: 'created', path: '/a.ts', content: '...' })  → 'Created /a.ts'
 * describeEvent({ type: 'modified', path: '/b.ts', ... })            → 'Modified /b.ts'
 * describeEvent({ type: 'deleted', path: '/c.ts' })                  → 'Deleted /c.ts'
 */
export function describeEvent(event: FileEvent): string {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: Result 타입 패턴
 *
 * divide(10, 2) → { ok: true, value: 5 }
 * divide(10, 0) → { ok: false, error: 'Division by zero' }
 */
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }

export function divide(a: number, b: number): Result<number, string> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: exhaustive check — 모든 case를 처리했는지 컴파일 타임에 보장
 *
 * getEventIcon({ type: 'created', ... })  → '+'
 * getEventIcon({ type: 'modified', ... }) → '~'
 * getEventIcon({ type: 'deleted', ... })  → '-'
 *
 * switch default에서 assertNever를 사용하면
 * 새 타입 추가 시 빠뜨린 case를 컴파일 에러로 잡을 수 있음
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`)
}

export function getEventIcon(event: FileEvent): string {
  throw new Error('구현해보세요!')
}
