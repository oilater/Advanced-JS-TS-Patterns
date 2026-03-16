/**
 * 에러 스택 교체 — 직접 만들어보기
 *
 * 목표: 에러 발생 시 호출 지점의 스택을 보여주는 패턴을 구현한다.
 */

// ============================================================
// 과제 1: copyStackTrace 함수 구현
// ============================================================

function copyStackTrace(target: Error, source: Error): Error {
  // TODO:
  // - source의 스택을 target에 복사
  // - source.message 부분은 target.message로 교체
  throw new Error('구현해보세요!')
}

// 테스트:
// const registrationError = new Error('REGISTERED')
// // ... 시간이 지남 ...
// const runtimeError = new Error('Something went wrong')
// copyStackTrace(runtimeError, registrationError)
// console.log(runtimeError.stack)
// // → "Error: Something went wrong" + 등록 시점의 스택 라인들

// ============================================================
// 과제 2: SafeEmitter — 에러 시 등록 시점 스택 보여주기
// ============================================================

class SafeEmitter {
  private handlers = new Map<
    string,
    Array<{
      fn: Function
      registrationStack: Error
    }>
  >()

  on(event: string, fn: Function): void {
    // TODO: new Error('REGISTRATION') 저장과 함께 핸들러 등록
    throw new Error('구현해보세요!')
  }

  emit(event: string, ...args: any[]): void {
    // TODO:
    // - 핸들러 실행
    // - 에러 발생 시 registrationStack으로 스택 교체
    throw new Error('구현해보세요!')
  }
}

// 테스트:
// const emitter = new SafeEmitter()
//
// // 100번 줄에서 등록
// emitter.on('data', (x: number) => {
//   if (x < 0) throw new Error('음수는 안됨!')
// })
//
// // 200번 줄에서 emit
// emitter.emit('data', -1)
// // → 에러 스택이 200번(emit)이 아니라 100번(등록)을 가리킴!

// ============================================================
// 과제 3: withBetterStack — HOF + 에러 스택 교체 조합
// ============================================================

function withBetterStack<T extends (...args: any[]) => any>(fn: T): T {
  // TODO:
  // - 래핑 시점의 스택을 캡처
  // - fn 실행 중 에러 시 캡처한 스택으로 교체
  // 이렇게 하면 "어디서 이 함수를 래핑했는지" 알 수 있음
  throw new Error('구현해보세요!')
}

// 테스트:
// const riskyFn = withBetterStack(() => {
//   throw new Error('뭔가 잘못됨')
// })
// riskyFn() // 에러 스택이 withBetterStack 호출 위치를 가리킴

export { copyStackTrace, SafeEmitter, withBetterStack }
