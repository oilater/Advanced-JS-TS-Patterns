/**
 * 기초 1: Promise 생성자 깊이 이해하기
 *
 * Deferred Promise를 이해하려면
 * Promise 생성자 안의 resolve/reject가 어떻게 동작하는지 정확히 알아야 한다.
 */

// ============================================================
// Promise 생성자 분석
// ============================================================

// new Promise(executor) — executor는 즉시 실행됨!
const p = new Promise<string>((resolve, reject) => {
  console.log('1. executor 즉시 실행') // 즉시!

  setTimeout(() => {
    console.log('3. 1초 후 resolve')
    resolve('완료')
  }, 1000)
})

console.log('2. Promise 생성 후') // executor 다음에 실행

// 출력 순서: 1 → 2 → 3

// ============================================================
// resolve/reject는 함수일 뿐!
// ============================================================

// resolve와 reject는 그냥 "함수"다
// 어디서든 호출할 수 있다 — 이게 Deferred Promise의 기반!

let savedResolve: ((value: string) => void) | null = null

const p2 = new Promise<string>((resolve) => {
  savedResolve = resolve // resolve 함수를 외부 변수에 저장!
})

// 나중에 어디서든 호출 가능
setTimeout(() => {
  savedResolve?.('외부에서 resolve!')
}, 2000)

// p2를 await 하면 2초 후에 '외부에서 resolve!' 받음

// ============================================================
// resolve는 한 번만 유효
// ============================================================

const p3 = new Promise<number>((resolve) => {
  resolve(1) // 첫 번째 — 유효!
  resolve(2) // 두 번째 — 무시됨
  resolve(3) // 세 번째 — 무시됨
})
// p3의 값은 항상 1

// ============================================================
// 과제 1: 수동 Promise 만들기
// ============================================================

function manualPromise(): {
  promise: Promise<string>
  resolve: (value: string) => void
} {
  // TODO:
  // - Promise를 만들고
  // - resolve 함수를 외부로 노출
  // - { promise, resolve } 반환
  throw new Error('구현해보세요!')
}

// const { promise, resolve } = manualPromise()
// setTimeout(() => resolve('hello'), 1000)
// const result = await promise // 'hello' (1초 후)

// ============================================================
// 과제 2: 버튼 클릭 대기
// ============================================================

function waitForClick(buttonId: string): Promise<MouseEvent> {
  // TODO:
  // - Promise를 만들고
  // - 버튼의 click 이벤트에서 resolve 호출
  // - 클릭하면 MouseEvent로 resolve
  throw new Error('구현해보세요!')
}

// const event = await waitForClick('submit-btn')
// console.log('클릭 위치:', event.clientX, event.clientY)

// ============================================================
// 과제 3: 타임아웃 있는 Promise
// ============================================================

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  // TODO:
  // - promise가 ms 내에 완료되면 그 결과 반환
  // - ms 초과하면 reject (Error: 'Timeout')
  // 힌트: Promise.race 사용
  throw new Error('구현해보세요!')
}

// const slow = new Promise(r => setTimeout(() => r('done'), 5000))
// await withTimeout(slow, 1000) // Error: 'Timeout' (1초 후)

export { manualPromise, waitForClick, withTimeout }
