// 판별 유니온 과제

interface FileCreated { type: 'created'; path: string; content: string }
interface FileModified { type: 'modified'; path: string; oldContent: string; newContent: string }
interface FileDeleted { type: 'deleted'; path: string }
export type FileEvent = FileCreated | FileModified | FileDeleted

/** 과제 1: 이벤트 타입별 설명 반환 */
export function describeEvent(event: FileEvent): string {
  // created  → 'Created {path}'
  // modified → 'Modified {path}'
  // deleted  → 'Deleted {path}'
  throw new Error('구현해보세요!')
}

/** 과제 2: Result 타입 */
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }

export function divide(a: number, b: number): Result<number, string> {
  // b가 0이면 { ok: false, error: 'Division by zero' }
  // 아니면 { ok: true, value: a / b }
  throw new Error('구현해보세요!')
}

/** 과제 3: exhaustive check — 모든 case를 처리했는지 컴파일 타임에 보장 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`)
}

export function getEventIcon(event: FileEvent): string {
  // created → '+', modified → '~', deleted → '-'
  // default에서 assertNever 사용
  throw new Error('구현해보세요!')
}
