// ReturnType + typeof 과제

/** 과제 1: 팩토리 함수 */
export function createApiClient(baseUrl: string) {
  return {
    get: async (path: string) => ({ url: `${baseUrl}${path}`, method: 'GET' }),
    post: async (path: string, body: unknown) => ({ url: `${baseUrl}${path}`, method: 'POST', body }),
    baseUrl,
  }
}

export type ApiClient = ReturnType<typeof createApiClient>

/** 과제 2: Parameters로 래퍼 함수 만들기 */
export function sendEmail(to: string, subject: string, body: string): string {
  return `To: ${to}, Subject: ${subject}, Body: ${body}`
}

export type SendEmailParams = Parameters<typeof sendEmail>

export function scheduledSendEmail(...args: SendEmailParams): string {
  // sendEmail을 호출하되 '[Scheduled] ' 접두사를 body에 추가
  throw new Error('구현해보세요!')
}
