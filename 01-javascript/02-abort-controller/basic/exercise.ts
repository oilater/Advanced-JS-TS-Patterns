// 기초 과제: Promise + EventListener

/** 과제 1: ms 밀리초 후 resolve되는 Promise */
export function delay(ms: number): Promise<void> {
  throw new Error('구현해보세요!')
}

/** 과제 2: 3개의 Promise를 동시에 실행하고 모든 결과를 배열로 반환 */
export async function fetchAll(): Promise<string[]> {
  const p1 = delay(10).then(() => 'A')
  const p2 = delay(20).then(() => 'B')
  const p3 = delay(30).then(() => 'C')
  // 힌트: Promise.all
  throw new Error('구현해보세요!')
}

/** 과제 3: 가장 먼저 끝나는 Promise의 결과 반환 */
export async function fastest(): Promise<string> {
  const fast = delay(10).then(() => '빠름')
  const slow = delay(200).then(() => '느림')
  // 힌트: Promise.race
  throw new Error('구현해보세요!')
}

/** 과제 4: cleanup 함수를 반환하는 반복 타이머 */
export function startTimer(
  callback: () => void,
  intervalMs: number,
): () => void {
  // setInterval로 실행하고, cleanup 함수 (clearInterval) 반환
  throw new Error('구현해보세요!')
}
