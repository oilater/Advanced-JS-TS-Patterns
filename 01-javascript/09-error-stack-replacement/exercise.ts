// 에러 스택 교체 과제

/** 과제 1: target 에러의 스택을 source 에러의 스택으로 교체 */
export function copyStackTrace(target: Error, source: Error): Error {
  // source.stack에서 source.message를 target.message로 바꿔서 target.stack에 넣기
  throw new Error('구현해보세요!')
}

/** 과제 2: 핸들러 등록 시점의 스택을 보여주는 이벤트 이미터 */
export class SafeEmitter {
  private handlers = new Map<string, Array<{ fn: Function; stack: Error }>>()

  on(event: string, fn: Function): void {
    throw new Error('구현해보세요!')
  }

  emit(event: string, ...args: any[]): void {
    // 핸들러 에러 시 등록 시점의 스택으로 교체하고 throw
    throw new Error('구현해보세요!')
  }
}

/** 과제 3: 래핑 시점의 스택을 보여주는 HOF */
export function withBetterStack<T extends (...args: any[]) => any>(fn: T): T {
  // fn 실행 중 에러 시, 이 함수가 호출된 시점의 스택으로 교체
  throw new Error('구현해보세요!')
}
