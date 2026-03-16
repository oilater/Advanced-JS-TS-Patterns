/**
 * TS 패턴 11: 라벨 튜플 (Labeled Tuples)
 * 난이도: ★☆☆
 *
 * 튜플의 각 위치에 이름을 붙여서 의미를 명확히 한다.
 * 라벨은 개발자 편의용이고 런타임에는 그냥 배열.
 */

// ============================================================
// 기본 비교
// ============================================================

// 일반 튜플 — 각 위치가 뭔지 모름
type ResultBad = [string, number, boolean]

// 라벨 튜플 — 의미가 명확!
type ResultGood = [id: string, score: number, passed: boolean]

// ============================================================
// Vitest 실제 코드
// packages/runner/src/types/tasks.ts:221
// ============================================================

// 워커 간 통신에서 데이터를 주고받을 때
// 객체보다 배열이 직렬화/역직렬화가 빠르다!
type TaskResultPack = [
  id: string,
  result: { status: string } | undefined,
  meta: { duration?: number },
]

type TaskEventPack = [
  id: string,
  event: string,
  data: unknown | undefined,
]

// 사용할 때: 구조 분해
function processResult(pack: TaskResultPack) {
  const [id, result, meta] = pack
  console.log(id, result?.status, meta.duration)
}

export type { TaskResultPack, TaskEventPack }
export { processResult }
