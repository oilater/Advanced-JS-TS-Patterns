// 기초 과제: 함수를 값으로 다루기 + 클로저 + 함수 반환

/** 과제 1: 숫자를 받아 2배를 반환 */
export const double = (x: number): number => {
  throw new Error('구현해보세요!')
}

/** 과제 2: 함수 배열을 순서대로 적용 (reduce 사용) */
export function pipe(value: number, fns: Array<(x: number) => number>): number {
  throw new Error('구현해보세요!')
}

/** 과제 3: greeting을 기억하는 함수 반환 (클로저) */
export function makeGreeter(greeting: string): (name: string) => string {
  // makeGreeter('안녕')('철수') → '안녕, 철수!'
  throw new Error('구현해보세요!')
}

/** 과제 4: fn을 한 번만 실행하고, 이후에는 첫 결과를 반환 (클로저) */
export function once<T>(fn: () => T): () => T {
  throw new Error('구현해보세요!')
}

/** 과제 5: 호출 횟수를 .count로 추적하는 래퍼 (함수 반환 + 프로퍼티) */
export function withCount<T extends (...args: any[]) => any>(
  fn: T,
): T & { count: number } {
  throw new Error('구현해보세요!')
}
