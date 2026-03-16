// 기초 과제: 함수를 값으로 다루기 + 클로저 + 함수 반환

/**
 * 과제 1: 숫자를 받아 2배를 반환
 *
 * double(5)  → 10
 * double(-3) → -6
 */
export const double = (x: number): number => {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 함수 배열을 순서대로 적용
 *
 * const add1 = (x: number) => x + 1
 * const times2 = (x: number) => x * 2
 * pipe(3, [add1, times2]) → 8   // (3+1)*2
 * pipe(5, [])             → 5   // 함수 없으면 그대로
 */
export function pipe(value: number, fns: Array<(x: number) => number>): number {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: greeting을 기억하는 함수 반환 (클로저)
 *
 * const hello = makeGreeter('안녕')
 * hello('철수') → '안녕, 철수!'
 * hello('영희') → '안녕, 영희!'
 *
 * const hi = makeGreeter('Hi')
 * hi('Kim') → 'Hi, Kim!'
 */
export function makeGreeter(greeting: string): (name: string) => string {
  throw new Error('구현해보세요!')
}

/**
 * 과제 4: fn을 딱 한 번만 실행하고, 이후에는 첫 결과를 반환
 *
 * const init = once(() => { console.log('실행!'); return 42 })
 * init() → 42  (콘솔: "실행!")
 * init() → 42  (콘솔 출력 없음 — fn이 다시 실행되지 않음)
 * init() → 42
 *
 * 핵심: once()를 만들 때가 아니라, 반환된 함수를 "처음 호출할 때" 실행
 */
export function once<T>(fn: () => T): () => T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 5: 호출 횟수를 .count로 추적하는 래퍼
 *
 * const add = withCount((a: number, b: number) => a + b)
 * add.count   → 0
 * add(1, 2)   → 3
 * add(3, 4)   → 7
 * add.count   → 2
 */
export function withCount<T extends (...args: any[]) => any>(
  fn: T,
): T & { count: number } {
  throw new Error('구현해보세요!')
}
