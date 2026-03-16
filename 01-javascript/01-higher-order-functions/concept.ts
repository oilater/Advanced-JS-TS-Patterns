/**
 * 패턴 1: 고차 함수 (Higher-Order Functions)
 * 중요도: ★★★★★ | 난이도: ★★☆
 *
 * 함수를 인자로 받거나, 함수를 반환하는 함수.
 * 원래 함수를 수정하지 않고 감싸서 기능(타임아웃, 로깅, 재시도 등)을 추가한다.
 *
 * 핵심 규칙:
 *   withXxx(fn) → 새 함수 반환
 *   - 원래 함수 수정 없이 기능 추가
 *   - 여러 with를 조합 가능: withTimeout(withCancel(withRetry(fn)))
 *   - React에서는 커스텀 훅이 이 역할을 대신함
 */

// ============================================================
// 1. Vitest 실제 코드: withTimeout
//    packages/runner/src/context.ts:40
// ============================================================

/**
 * 테스트/훅 함수에 타임아웃을 감싸는 패턴.
 * Vitest에서 가장 중요한 HOF!
 */
function withTimeout<T extends (...args: any[]) => any>(
  fn: T,
  timeout: number,
  isHook: boolean,
  stackTraceError?: Error,
): T {
  // 타임아웃 없으면 원래 함수 그대로 반환
  if (timeout <= 0 || timeout === Number.POSITIVE_INFINITY) {
    return fn
  }

  // 감싸진 새 함수 반환
  return (function runWithTimeout(...args: any[]) {
    return new Promise((resolve_, reject_) => {
      const timer = setTimeout(() => {
        reject_(new Error(`Timeout of ${timeout}ms exceeded`))
      }, timeout)

      try {
        const result = fn(...args)
        if (result && typeof result.then === 'function') {
          result.then(resolve, reject_)
        } else {
          resolve(result)
        }
      } catch (error) {
        reject_(error)
      }

      function resolve(result: any) {
        clearTimeout(timer)
        resolve_(result)
      }
    })
  }) as T
}

// ============================================================
// 2. Vitest 실제 코드: withCancel
//    packages/runner/src/context.ts:114
// ============================================================

function withCancel<T extends (...args: any[]) => any>(
  fn: T,
  signal: AbortSignal,
): T {
  return (function runWithCancel(...args: any[]) {
    return new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason))
      const result = fn(...args)
      if (typeof result?.then === 'function') {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    })
  }) as T
}

// ============================================================
// 3. React/실무 활용 예제
// ============================================================

// 3-1. API 클라이언트에서 인증 헤더 자동 추가
function withAuth(fetchFn: typeof fetch): typeof fetch {
  return (url, options = {}) => {
    const token = 'my-token' // getToken()
    return fetchFn(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    })
  }
}
const authFetch = withAuth(fetch)

// 3-2. withRetry — API 호출 재시도
function withRetryExample(fn: Function, maxRetries = 3) {
  return async (...args: any[]) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn(...args)
      } catch (e) {
        if (i === maxRetries - 1) throw e
      }
    }
  }
}

// 3-3. 여러 HOF 조합
// withTimeout + withCancel + withRetry 를 조합 가능!
// withTimeout(withCancel(withRetry(fn)))

export { withTimeout, withCancel, withAuth, withRetryExample }
