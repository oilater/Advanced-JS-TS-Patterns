/**
 * 기초 2: EventListener와 cleanup 패턴
 *
 * AbortController는 EventTarget 기반이다.
 * signal.addEventListener('abort', handler) 패턴을 먼저 이해하자.
 */

// ============================================================
// addEventListener / removeEventListener
// ============================================================

function setupClickHandler() {
  const handler = (e: Event) => {
    console.log('클릭됨!', e)
  }

  // 등록
  document.addEventListener('click', handler)

  // 정리 (cleanup) — 이벤트 핸들러를 제거해야 메모리 누수 방지
  return () => {
    document.removeEventListener('click', handler)
  }
}

// const cleanup = setupClickHandler()
// cleanup()  // 핸들러 제거

// ============================================================
// AbortSignal 기본 — 이벤트 리스너를 자동으로 제거
// ============================================================

function demo() {
  const controller = new AbortController()

  // signal 옵션으로 이벤트 리스너 자동 정리!
  document.addEventListener(
    'click',
    () => console.log('클릭!'),
    { signal: controller.signal }, // ← 이게 핵심
  )

  // abort() 하면 위의 이벤트 리스너가 자동으로 제거됨
  controller.abort()
}

// ============================================================
// cleanup 패턴: React useEffect와의 관계
// ============================================================

// React의 useEffect는 이 cleanup 패턴을 강제한다:
//
// useEffect(() => {
//   const handler = () => { ... }
//   window.addEventListener('resize', handler)
//
//   return () => {                              // cleanup 함수
//     window.removeEventListener('resize', handler)
//   }
// }, [])
//
// 컴포넌트 언마운트 시 cleanup 함수가 자동 호출됨

// ============================================================
// 과제 1: cleanup 함수를 반환하는 타이머
// ============================================================

function startTimer(callback: () => void, intervalMs: number): () => void {
  // TODO:
  // - setInterval로 callback을 반복 실행
  // - cleanup 함수 반환 (clearInterval)
  throw new Error('구현해보세요!')
}

// const stop = startTimer(() => console.log('틱!'), 1000)
// // 1초마다 "틱!"
// stop()  // 멈춤

// ============================================================
// 과제 2: AbortSignal 이벤트 감지
// ============================================================

function doWorkUntilAborted(signal: AbortSignal): void {
  // TODO:
  // - signal에 'abort' 이벤트 리스너 등록
  // - abort 시 "작업 취소됨!" 출력
  throw new Error('구현해보세요!')
}

// const controller = new AbortController()
// doWorkUntilAborted(controller.signal)
// controller.abort()  // "작업 취소됨!"

// ============================================================
// 과제 3: 여러 리스너를 한 번에 정리
// ============================================================

function setupMultipleListeners(): () => void {
  // TODO:
  // - AbortController 하나 만들기
  // - 3개의 이벤트 리스너를 signal로 등록
  // - controller.abort()를 호출하는 cleanup 함수 반환
  // → cleanup() 한 번으로 3개 모두 제거!
  throw new Error('구현해보세요!')
}

export { startTimer, doWorkUntilAborted, setupMultipleListeners }
