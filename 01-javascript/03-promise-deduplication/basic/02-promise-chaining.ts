/**
 * 기초 2: Promise 체이닝과 finally
 *
 * Promise 중복 제거에서 .finally()가 핵심 역할을 한다.
 * "요청 완료(성공이든 실패든) 후 Map에서 삭제"를 할 때 씀.
 */

// ============================================================
// then / catch / finally
// ============================================================

// then  → 성공 시
// catch → 실패 시
// finally → 성공/실패 상관없이 항상

async function demo() {
  const result = await fetch('/api/data')
    .then((r) => r.json()) // 성공: JSON 파싱
    .catch((e) => {
      // 실패: 기본값 반환
      console.error(e)
      return null
    })
    .finally(() => {
      // 항상: 로딩 상태 해제
      console.log('요청 완료')
    })
}

// ============================================================
// finally의 핵심 특성
// ============================================================

// 1. 성공이든 실패든 항상 실행됨
// 2. 값을 바꾸지 않음 (then처럼 반환값이 체인에 전달되지 않음)
// 3. "정리 작업"에 딱 맞음

const example = Promise.resolve(42)
  .then((x) => x * 2) // 84
  .finally(() => console.log('정리!')) // "정리!" — 값은 그대로 84
  .then((x) => console.log(x)) // 84

// ============================================================
// 이게 Promise 중복 제거에서 어떻게 쓰이는가
// ============================================================

const pending = new Map<string, Promise<any>>()

function fetchOnce(url: string): Promise<any> {
  if (!pending.has(url)) {
    const promise = fetch(url)
      .then((r) => r.json())
      .finally(() => {
        pending.delete(url) // 완료 후 Map에서 제거!
        // finally니까 성공/실패 둘 다 제거됨
      })
    pending.set(url, promise)
  }
  return pending.get(url)!
}

// ============================================================
// 과제 1: finally로 로딩 상태 관리
// ============================================================

function fetchWithLoading(url: string) {
  let isLoading = false

  async function doFetch(): Promise<any> {
    // TODO:
    // - isLoading = true 로 설정
    // - fetch 실행
    // - finally에서 isLoading = false
    // - 결과 반환
    throw new Error('구현해보세요!')
  }

  return { doFetch, isLoading: () => isLoading }
}

// ============================================================
// 과제 2: Promise 하나를 여러 곳에서 await
// ============================================================

// 핵심 이해: 하나의 Promise를 여러 곳에서 await 하면 모두 같은 결과를 받는다!
async function sharedPromiseDemo() {
  const promise = new Promise<number>((resolve) => {
    console.log('실행됨!') // 1번만 출력
    setTimeout(() => resolve(42), 100)
  })

  // TODO: promise를 3번 await 해서 결과가 모두 42인지 확인
  // console.log은 1번만 나와야 함 (Promise는 1번만 실행되니까)
  throw new Error('구현해보세요!')
}

export { fetchOnce, fetchWithLoading, sharedPromiseDemo }
