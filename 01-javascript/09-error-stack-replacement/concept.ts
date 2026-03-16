/**
 * 패턴 9: 에러 스택 교체 — 디버깅 위치 개선
 * 중요도: ★★★☆☆ | 난이도: ★★★
 *
 * 에러가 내부 코드에서 발생하지만, 사용자가 봐야 할 건 "어디서 호출했는지".
 * 내부 스택 대신 호출 지점 스택을 보여줘야 한다.
 * 라이브러리 에러 메시지 품질의 핵심!
 */

// ============================================================
// 1. Vitest 실제 코드
// ============================================================

// 1-1. 등록 시점에 스택 캡처 — packages/runner/src/fixture.ts
const FIXTURE_STACK_TRACE_KEY = Symbol.for('VITEST_FIXTURE_STACK_TRACE')

function registerFixture(fn: Function) {
  // 등록 시점의 스택을 미리 캡처해둔다
  ;(fn as any)[FIXTURE_STACK_TRACE_KEY] = new Error('STACK_TRACE_ERROR')
}

// 1-2. 에러 시 스택 교체 — packages/integrations/chai/poll.ts:37
function copyStackTrace(target: Error, source: Error) {
  if (source.stack !== undefined) {
    target.stack = source.stack.replace(source.message, target.message)
  }
  return target
}

// ============================================================
// 2. React/실무 활용 예제
// ============================================================

// 2-1. API 클라이언트에서 호출 위치 추적
async function apiCall(url: string) {
  const callSite = new Error('API_CALL') // 호출 지점 캡처

  try {
    return await fetch(url)
  } catch (error: any) {
    // 네트워크 에러 스택 대신 호출 지점 스택으로 교체
    if (callSite.stack) {
      error.stack = callSite.stack.replace('API_CALL', error.message)
    }
    throw error
  }
}

// 2-2. 이벤트 핸들러 등록 위치 추적
class EventEmitter {
  private handlers = new Map<
    string,
    Array<{ fn: Function; registrationStack: Error }>
  >()

  on(event: string, fn: Function) {
    const entry = {
      fn,
      registrationStack: new Error('HANDLER_REGISTERED'), // 등록 시점 캡처
    }
    const list = this.handlers.get(event) ?? []
    list.push(entry)
    this.handlers.set(event, list)
  }

  emit(event: string, ...args: any[]) {
    const list = this.handlers.get(event) ?? []
    for (const { fn, registrationStack } of list) {
      try {
        fn(...args)
      } catch (error: any) {
        // 에러 스택을 등록 시점으로 교체
        copyStackTrace(error, registrationStack)
        throw error
      }
    }
  }
}

export { copyStackTrace, apiCall, EventEmitter }
