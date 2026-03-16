// Deferred Promise 과제

export type DeferPromise<T> = Promise<T> & {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

/**
 * 과제 1: 외부에서 resolve/reject 할 수 있는 Promise
 *
 * const defer = createDefer<string>()
 * setTimeout(() => defer.resolve('hello'), 1000)
 * await defer → 'hello'
 *
 * defer.then(x => x + '!')  // Promise처럼 체이닝도 가능
 */
export function createDefer<T>(): DeferPromise<T> {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 큐 기반 작업 처리기
 *
 * const queue = new TaskQueue<number>()
 * const p1 = queue.enqueue(async () => 42)   // 대기 중
 * const p2 = queue.enqueue(async () => 100)  // 대기 중
 *
 * await queue.processNext()  // 첫 번째 실행
 * await p1 → 42
 *
 * await queue.processNext()  // 두 번째 실행
 * await p2 → 100
 */
export class TaskQueue<T> {
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

/**
 * 과제 3: N개의 호출자가 모일 때까지 대기하는 barrier
 *
 * const barrier = createBarrier(3)
 * barrier()  // 대기...
 * barrier()  // 대기...
 * barrier()  // 3번째 호출 → 3개 모두 동시에 resolve!
 */
export function createBarrier(count: number): () => Promise<void> {
  throw new Error('구현해보세요!')
}
