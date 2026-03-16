/**
 * 패턴 7: Symbol — 숨겨진 프라이빗 키
 * 중요도: ★★★☆☆ | 난이도: ★★☆
 *
 * 객체에 메타데이터를 붙이되, 일반 프로퍼티와 충돌하면 안 될 때.
 * - Object.keys()에 안 나옴
 * - JSON.stringify에 안 나옴
 * - Symbol로만 접근 가능
 *
 * Symbol() vs Symbol.for():
 *   Symbol()      — 매번 새로운 유일한 심볼
 *   Symbol.for()  — 같은 key면 같은 심볼 (글로벌 레지스트리)
 */

// ============================================================
// 기본 동작
// ============================================================

const SECRET = Symbol('secret')
const obj = { name: 'test', [SECRET]: 'hidden' }

// Object.keys(obj)     → ['name'] — Symbol 키는 안 보임
// JSON.stringify(obj)  → '{"name":"test"}' — 직렬화에도 안 나옴
// obj[SECRET]          → 'hidden' — Symbol로만 접근 가능

// ============================================================
// 1. Vitest 실제 코드
// ============================================================

// 네 PR #9861의 패턴!
const FIXTURE_STACK_TRACE_KEY = Symbol.for('VITEST_FIXTURE_STACK_TRACE')
// fn[FIXTURE_STACK_TRACE_KEY] = new Error('STACK_TRACE_ERROR')

// 훅 메타데이터 — packages/runner/src/hooks.ts:30
const CLEANUP_TIMEOUT_KEY = Symbol.for('VITEST_CLEANUP_TIMEOUT')
const CLEANUP_STACK_TRACE_KEY = Symbol.for('VITEST_CLEANUP_STACK_TRACE')

// Object.assign으로 함수에 Symbol 메타데이터 부착
function attachMetadata(fn: Function, timeout: number, stackTraceError: Error) {
  return Object.assign(fn, {
    [CLEANUP_TIMEOUT_KEY]: timeout,
    [CLEANUP_STACK_TRACE_KEY]: stackTraceError,
  })
}

// ============================================================
// 2. React/실무 활용 예제
// ============================================================

// 2-1. React 내부 — 엘리먼트 식별
const REACT_ELEMENT_TYPE = Symbol.for('react.element')

// 2-2. 상태 관리 라이브러리에서 내부 키 숨기기
const STORE_KEY = Symbol('store')

function createStore<T>(initialState: T) {
  return {
    [STORE_KEY]: initialState, // 외부에서 직접 접근 방지
    getState() {
      return (this as any)[STORE_KEY]
    },
  }
}

// 2-3. 플러그인 시스템에서 충돌 방지
const PLUGIN_META = Symbol('pluginMeta')
function registerPlugin(plugin: any, meta: any) {
  plugin[PLUGIN_META] = meta // 플러그인 자체 프로퍼티와 절대 충돌 안 함
}

export {
  FIXTURE_STACK_TRACE_KEY,
  CLEANUP_TIMEOUT_KEY,
  attachMetadata,
  createStore,
}
