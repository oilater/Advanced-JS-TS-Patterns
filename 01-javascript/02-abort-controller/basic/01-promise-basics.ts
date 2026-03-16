/**
 * 기초 1: Promise 기본
 *
 * AbortController를 이해하려면 먼저 Promise가 어떻게 동작하는지 알아야 한다.
 * Promise = "나중에 완료될 비동기 작업"을 표현하는 객체.
 */

// ============================================================
// Promise의 3가지 상태
// ============================================================

// pending  → 아직 결과 없음 (진행 중)
// fulfilled → 성공 (resolve 호출됨)
// rejected  → 실패 (reject 호출됨)

// 기본 생성
const myPromise = new Promise<string>((resolve, reject) => {
  // 비동기 작업 시뮬레이션
  setTimeout(() => {
    const success = true
    if (success) {
      resolve('성공!') // fulfilled 상태로
    } else {
      reject(new Error('실패!')) // rejected 상태로
    }
  }, 1000)
})

// 결과 받기
myPromise
  .then((result) => console.log(result)) // '성공!'
  .catch((error) => console.error(error))

// ============================================================
// then 체이닝
// ============================================================

function fetchUserName(id: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`User_${id}`), 100)
  })
}

fetchUserName(1)
  .then((name) => name.toUpperCase()) // 'USER_1'
  .then((upper) => `[${upper}]`) // '[USER_1]'
  .then((result) => console.log(result))

// ============================================================
// async/await — Promise의 문법적 설탕
// ============================================================

async function getUser(id: number) {
  const name = await fetchUserName(id) // then 대신 await
  const upper = name.toUpperCase()
  return `[${upper}]`
}

// try/catch로 에러 처리
async function safeGetUser(id: number) {
  try {
    return await getUser(id)
  } catch (error) {
    console.error('유저 조회 실패:', error)
    return null
  }
}

// ============================================================
// 과제 1: delay 함수 만들기
// ============================================================

function delay(ms: number): Promise<void> {
  // TODO: ms 밀리초 후에 resolve되는 Promise 반환
  throw new Error('구현해보세요!')
}

// await delay(1000) // 1초 대기

// ============================================================
// 과제 2: Promise.all 이해하기
// ============================================================

async function fetchMultiple(): Promise<string[]> {
  // TODO: 3개의 Promise를 동시에 실행하고 모든 결과를 배열로 반환
  // Promise.all 사용
  const p1 = delay(100).then(() => 'A')
  const p2 = delay(200).then(() => 'B')
  const p3 = delay(300).then(() => 'C')

  throw new Error('구현해보세요!')
}

// await fetchMultiple() → ['A', 'B', 'C'] (300ms 후)

// ============================================================
// 과제 3: Promise.race 이해하기
// ============================================================

async function firstToFinish(): Promise<string> {
  // TODO: 3개 중 가장 먼저 끝나는 것의 결과 반환
  // Promise.race 사용
  const fast = delay(100).then(() => '빠름')
  const medium = delay(500).then(() => '보통')
  const slow = delay(1000).then(() => '느림')

  throw new Error('구현해보세요!')
}

// await firstToFinish() → '빠름'

export { delay, fetchMultiple, firstToFinish }
