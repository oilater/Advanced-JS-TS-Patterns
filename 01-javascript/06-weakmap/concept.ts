/**
 * 패턴 6: WeakMap — GC 안전한 메타데이터 저장
 * 중요도: ★★★☆☆ | 난이도: ★★☆
 *
 * 객체에 메타데이터를 붙이고 싶은데,
 * 그 객체가 GC될 때 메타데이터도 같이 사라져야 할 때.
 *
 * Map vs WeakMap:
 *   Map    — 키 객체 참조를 유지 → GC 안 됨 (메모리 누수!)
 *   WeakMap — 키 객체 참조를 약하게 유지 → 다른 참조 없으면 GC됨
 */

// ============================================================
// Map vs WeakMap 비교
// ============================================================

// Map — 메모리 누수 위험
function mapLeak() {
  const cache = new Map()
  let obj: any = { data: 'big' }
  cache.set(obj, 'metadata')
  obj = null // obj는 없앴지만 Map이 참조 → GC 안 됨!
}

// WeakMap — 안전
function weakMapSafe() {
  const cache = new WeakMap()
  let obj: any = { data: 'big' }
  cache.set(obj, 'metadata')
  obj = null // 참조 없으면 GC 알아서 제거!
}

// ============================================================
// 1. Vitest 실제 코드
// ============================================================

// fixture cleanup — packages/runner/src/fixture.ts:237
const cleanupFnArrayMap = new WeakMap<object, Array<() => void | Promise<void>>>()

// mock 설정 — packages/spy/src/index.ts:25
interface MockConfig {
  name: string
}
interface Mock extends Function {
  _isMockFunction: boolean
}
const MOCK_CONFIGS = new WeakMap<Mock, MockConfig>()

// AbortController 관리 — packages/runner/src/context.ts:139
interface TestContext {
  signal: AbortSignal
}
const abortControllers = new WeakMap<TestContext, AbortController>()

// ============================================================
// 2. React/실무 활용 예제
// ============================================================

// 2-1. DOM 요소에 데이터 연결
const elementData = new WeakMap<HTMLElement, { clickCount: number }>()

function trackClicks(element: HTMLElement) {
  const data = elementData.get(element) ?? { clickCount: 0 }
  data.clickCount++
  elementData.set(element, data)
  // element가 DOM에서 제거되면 data도 자동 GC
}

// 2-2. 이벤트 핸들러 추적 (cleanup용)
const listeners = new WeakMap<EventTarget, Set<Function>>()

export { trackClicks, listeners }
