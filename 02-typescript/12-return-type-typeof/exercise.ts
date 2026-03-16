/**
 * ReturnType + typeof — 직접 만들어보기
 */

// ============================================================
// 과제 1: 팩토리 함수의 반환 타입 활용
// ============================================================

function createApiClient(baseUrl: string) {
  return {
    get: (path: string) => fetch(`${baseUrl}${path}`).then((r) => r.json()),
    post: (path: string, body: unknown) =>
      fetch(`${baseUrl}${path}`, {
        method: 'POST',
        body: JSON.stringify(body),
      }).then((r) => r.json()),
    baseUrl,
  }
}

// ReturnType으로 타입 추출
type ApiClient = ReturnType<typeof createApiClient>

// 다른 곳에서 사용
function useApi(client: ApiClient) {
  // client.get, client.post, client.baseUrl 모두 타입 추론됨
}

// ============================================================
// 과제 2: 설정 객체에서 타입 추출
// ============================================================

function defineConfig() {
  return {
    theme: 'dark' as const,
    language: 'ko' as const,
    features: {
      notifications: true,
      analytics: false,
    },
  }
}

type AppConfig = ReturnType<typeof defineConfig>
// AppConfig.theme → 'dark' (as const 덕분에 리터럴!)

// ============================================================
// 과제 3: Parameters로 함수 인자 타입도 추출
// ============================================================

function sendEmail(to: string, subject: string, body: string, cc?: string[]) {
  /* ... */
}

type SendEmailParams = Parameters<typeof sendEmail>
// → [to: string, subject: string, body: string, cc?: string[]]

// 래퍼 함수에서 활용
function scheduledSendEmail(...args: SendEmailParams) {
  // TODO: 스케줄링 로직 추가 후 sendEmail 호출
  return sendEmail(...args)
}

export type { ApiClient, AppConfig, SendEmailParams }
export { createApiClient, defineConfig, scheduledSendEmail }
