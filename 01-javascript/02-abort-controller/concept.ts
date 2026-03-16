/**
 * 패턴 2: AbortController — 취소 가능한 비동기 작업
 * 중요도: ★★★★★ | 난이도: ★★☆
 *
 * 컴포넌트가 언마운트됐는데 fetch가 아직 진행 중이면?
 * 응답이 돌아와서 setState를 하면 메모리 누수 + 에러.
 *
 * 핵심 규칙:
 *   AbortController = 신호 보내는 쪽 (abort() 호출)
 *   AbortSignal     = 신호 받는 쪽 (signal 전달)
 *
 *   React에서:
 *   - useEffect의 cleanup → controller.abort()
 *   - 새 요청 전 → 이전 controller.abort()
 */

// ============================================================
// 1. Vitest 실제 코드
//    packages/runner/src/context.ts:139
// ============================================================

/**
 * Vitest는 WeakMap으로 각 테스트 컨텍스트별 AbortController를 관리한다.
 * 타임아웃 발생 시 해당 테스트의 비동기 작업을 모두 취소.
 */
interface TestContext {
  signal: AbortSignal
}

const abortControllers = new WeakMap<TestContext, AbortController>()

function setupContext(context: TestContext) {
  let abortController = abortControllers.get(context)
  if (!abortController) {
    abortController = new AbortController()
    abortControllers.set(context, abortController)
  }
  context.signal = abortController.signal
}

function abortContextSignal(context: TestContext, error: Error): void {
  const abortController = abortControllers.get(context)
  abortController?.abort(error)
}

// ============================================================
// 2. React/실무 활용 예제
// ============================================================

// 2-1. useEffect에서 fetch 취소 — 가장 기본!
function useFetchExample() {
  // useEffect(() => {
  //   const controller = new AbortController()
  //
  //   fetch('/api/users', { signal: controller.signal })
  //     .then(res => res.json())
  //     .then(setUsers)
  //     .catch(err => {
  //       if (err.name !== 'AbortError') throw err  // abort는 무시
  //     })
  //
  //   return () => controller.abort()  // cleanup에서 취소!
  // }, [])
}

// 2-2. 검색 자동완성 — 이전 요청 취소
function useSearchExample(query: string) {
  // const controllerRef = useRef<AbortController>()
  //
  // useEffect(() => {
  //   controllerRef.current?.abort()  // 이전 요청 취소!
  //   const controller = new AbortController()
  //   controllerRef.current = controller
  //
  //   fetch(`/api/search?q=${query}`, { signal: controller.signal })
  //     .then(res => res.json())
  //     .then(setResults)
  //     .catch(() => {})
  //
  //   return () => controller.abort()
  // }, [query])
}

// 2-3. 타임아웃 있는 fetch
async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

export { setupContext, abortContextSignal, fetchWithTimeout }
