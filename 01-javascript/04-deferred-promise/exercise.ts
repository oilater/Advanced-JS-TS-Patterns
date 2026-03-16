/**
 * Deferred Promise — 직접 만들어보기
 *
 * 목표: 외부에서 resolve/reject 할 수 있는 Promise를 구현한다.
 */

// ============================================================
// 과제 1: createDefer 직접 구현 (concept.ts 보지 말고!)
// ============================================================

type DeferPromise<T> = Promise<T> & {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

function createDefer<T>(): DeferPromise<T> {
  // TODO: Promise를 만들되, resolve/reject를 외부로 노출
  throw new Error('구현해보세요!')
}

// 테스트:
// const defer = createDefer<string>()
// setTimeout(() => defer.resolve('hello'), 1000)
// const result = await defer
// console.log(result) // 'hello' (1초 후)

// ============================================================
// 과제 2: 모달 확인 시뮬레이션
// ============================================================

async function confirmSimulation() {
  const defer = createDefer<boolean>()

  // 2초 후 "확인" 누른 것처럼 시뮬레이션
  setTimeout(() => defer.resolve(true), 2000)

  const result = await defer
  console.log(result ? '확인됨' : '취소됨')
}

// ============================================================
// 과제 3: 큐 기반 작업 처리기
// ============================================================

class TaskQueue<T> {
  // TODO:
  // - enqueue(task): DeferPromise를 만들어서 큐에 넣고 반환
  // - processNext(): 큐에서 하나 꺼내서 실행하고 결과로 resolve
  // - 호출자는 enqueue의 반환값을 await 하면 결과를 받음

  enqueue(task: () => Promise<T>): Promise<T> {
    throw new Error('구현해보세요!')
  }

  async processNext(): Promise<void> {
    throw new Error('구현해보세요!')
  }
}

// 테스트:
// const queue = new TaskQueue<number>()
// const promise1 = queue.enqueue(async () => 42)
// const promise2 = queue.enqueue(async () => 100)
//
// await queue.processNext() // 첫 번째 작업 실행
// console.log(await promise1) // 42
//
// await queue.processNext() // 두 번째 작업 실행
// console.log(await promise2) // 100

export { createDefer, confirmSimulation, TaskQueue }
