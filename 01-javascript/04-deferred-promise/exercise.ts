// Deferred Promise 과제

export type DeferPromise<T> = Promise<T> & {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

/** 과제 1: createDefer — 외부에서 resolve/reject 할 수 있는 Promise */
export function createDefer<T>(): DeferPromise<T> {
  throw new Error('구현해보세요!')
}

/** 과제 2: 큐 기반 작업 처리기 */
export class TaskQueue<T> {
  // enqueue: DeferPromise를 만들어 큐에 넣고 반환
  // processNext: 큐에서 하나 꺼내서 실행 후 resolve
  private queue: Array<{ task: () => Promise<T>; defer: DeferPromise<T> }> = []

  enqueue(task: () => Promise<T>): Promise<T> {
    throw new Error('구현해보세요!')
  }

  async processNext(): Promise<void> {
    throw new Error('구현해보세요!')
  }

  get size(): number {
    return this.queue.length
  }
}

/** 과제 3: createBarrier — N개의 호출자가 모일 때까지 대기 */
export function createBarrier(count: number): () => Promise<void> {
  // 반환된 함수를 count번 호출하면 모두가 동시에 resolve
  // 그 전까지는 모두 대기
  throw new Error('구현해보세요!')
}
