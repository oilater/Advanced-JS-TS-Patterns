// 에러 스택 교체 과제

/**
 * 과제 1: target 에러의 스택을 source 에러의 스택으로 교체
 *
 * const source = new Error('SOURCE')       // 등록 시점에 캡처
 * const target = new Error('실제 에러')     // 나중에 발생
 * copyStackTrace(target, source)
 *
 * target.stack → "Error: 실제 에러\n    at ..."  (source의 위치 정보)
 * // source.message('SOURCE')는 target.message('실제 에러')로 교체됨
 */
export function copyStackTrace(target: Error, source: Error): Error {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 핸들러 등록 시점의 스택을 보여주는 이벤트 이미터
 *
 * const emitter = new SafeEmitter()
 * emitter.on('data', (x) => { if (x < 0) throw new Error('음수!') })
 * emitter.emit('data', -1)
 * // → 에러 스택이 emit 위치가 아니라 on 등록 위치를 가리킴
 */
export class SafeEmitter {
  private handlers = new Map<string, Array<{ fn: Function; stack: Error }>>()

  on(event: string, fn: Function): void {
    throw new Error('구현해보세요!')
  }

  emit(event: string, ...args: any[]): void {
    throw new Error('구현해보세요!')
  }
}

/**
 * 과제 3: 래핑 시점의 스택을 보여주는 HOF
 *
 * const wrapped = withBetterStack(() => { throw new Error('내부 에러') })
 * wrapped()  // 에러 스택이 withBetterStack 호출 위치를 가리킴
 *
 * const safe = withBetterStack((x: number) => x * 2)
 * safe(5) → 10  (정상 동작 시 그대로 반환)
 */
export function withBetterStack<T extends (...args: any[]) => any>(fn: T): T {
  throw new Error('구현해보세요!')
}
