/**
 * 패턴 3: Promise 중복 제거 — 같은 요청 1번만 실행
 * 중요도: ★★★★☆ | 난이도: ★★☆
 *
 * 같은 API를 여러 컴포넌트에서 동시에 호출하면,
 * 실제로는 1번만 요청하고 결과를 공유하는 게 효율적.
 * SWR/TanStack Query의 핵심 원리!
 *
 * 핵심 아이디어:
 *   1. 요청 오면 Map에 Promise 있는지 확인
 *   2. 없으면 → 새로 만들어서 Map에 저장
 *   3. 있으면 → 기존 Promise 반환 (결과 공유)
 *   4. 완료되면 → Map에서 삭제 (다음엔 새로 요청)
 */

// ============================================================
// 1. Vitest 실제 코드
//    packages/vitest/src/node/cache/fsModuleCache.ts:72
// ============================================================

const parallelFsCacheRead = new Map<string, Promise<string>>()

function readCachedFileConcurrently(cachedFilePath: string) {
  if (!parallelFsCacheRead.has(cachedFilePath)) {
    parallelFsCacheRead.set(
      cachedFilePath,
      // readFile은 실제로 fs.readFile
      Promise.resolve(cachedFilePath)
        .then((code) => {
          /* 파싱 로직 */
          return code
        })
        .finally(() => {
          parallelFsCacheRead.delete(cachedFilePath) // 완료 후 제거
        }),
    )
  }
  return parallelFsCacheRead.get(cachedFilePath)!
}

// ============================================================
// 2. React/실무 활용 예제
// ============================================================

// 2-1. 직접 구현한 요청 중복제거
const pending = new Map<string, Promise<any>>()

async function fetchOnce<T>(url: string): Promise<T> {
  if (!pending.has(url)) {
    pending.set(
      url,
      fetch(url)
        .then((r) => r.json())
        .finally(() => pending.delete(url)),
    )
  }
  return pending.get(url)!
}

// 2-2. 이미지 프리로딩 중복제거
const imageCache = new Map<string, Promise<HTMLImageElement>>()

function preloadImage(src: string): Promise<HTMLImageElement> {
  if (!imageCache.has(src)) {
    imageCache.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      }),
    )
  }
  return imageCache.get(src)!
}

// 2-3. SWR/TanStack Query는 내부적으로 이걸 해줌
// 같은 key로 여러 컴포넌트가 useSWR 호출해도 요청은 1번
// const { data } = useSWR('/api/users', fetcher)

export { readCachedFileConcurrently, fetchOnce, preloadImage }
