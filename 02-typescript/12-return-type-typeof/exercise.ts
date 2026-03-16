// ReturnType + typeof 과제

/** 팩토리 함수 — ReturnType으로 타입 추출 */
export function createApiClient(baseUrl: string) {
  return {
    get: async (path: string) => ({ url: `${baseUrl}${path}`, method: 'GET' }),
    post: async (path: string, body: unknown) => ({ url: `${baseUrl}${path}`, method: 'POST', body }),
    baseUrl,
  }
}

export type ApiClient = ReturnType<typeof createApiClient>

/** sendEmail 함수 — Parameters로 인자 타입 추출 */
export function sendEmail(to: string, subject: string, body: string): string {
  return `To: ${to}, Subject: ${subject}, Body: ${body}`
}

export type SendEmailParams = Parameters<typeof sendEmail>

/**
 * 과제 1: sendEmail의 래퍼 — body에 '[Scheduled] ' 접두사 추가
 *
 * scheduledSendEmail('kim@test.com', 'Hello', 'Meeting')
 * → sendEmail('kim@test.com', 'Hello', '[Scheduled] Meeting') 의 결과
 */
export function scheduledSendEmail(...args: SendEmailParams): string {
  throw new Error('구현해보세요!')
}
