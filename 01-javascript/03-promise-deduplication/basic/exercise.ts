// 기초 과제: Map + Promise 체이닝

/**
 * 과제 1: 단어 빈도수 세기
 *
 * countWords(['a', 'b', 'a']) → Map { 'a' => 2, 'b' => 1 }
 * countWords([])              → Map {}
 */
export function countWords(words: string[]): Map<string, number> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: key가 없으면 factory로 만들어서 넣고 반환
 *
 * const m = new Map<string, number[]>()
 * getOrCreate(m, 'list', () => []).push(1)
 * getOrCreate(m, 'list', () => []).push(2)  // 기존 배열에 push
 * m.get('list') → [1, 2]
 */
export function getOrCreate<K, V>(map: Map<K, V>, key: K, factory: () => V): V {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: 하나의 Promise를 여러 곳에서 await하면 같은 결과를 받는지 확인
 *
 * await sharedPromise() → [1, 1, 1]  (같은 Promise니까 모두 같은 값)
 */
export async function sharedPromise(): Promise<[number, number, number]> {
  let runCount = 0
  const promise = new Promise<number>((resolve) => {
    runCount++
    setTimeout(() => resolve(runCount), 10)
  })
  const a = await promise
  const b = await promise
  const c = await promise
  return [a, b, c]
}
