import { describe, it, expect } from 'vitest'
import { createApiClient, scheduledSendEmail } from './exercise'

describe('createApiClient (ReturnType)', () => {
  it('get 요청', async () => {
    const client = createApiClient('https://api.example.com')
    const result = await client.get('/users')

    expect(result.url).toBe('https://api.example.com/users')
    expect(result.method).toBe('GET')
  })

  it('post 요청', async () => {
    const client = createApiClient('https://api.example.com')
    const result = await client.post('/users', { name: 'kim' })

    expect(result.url).toBe('https://api.example.com/users')
    expect(result.method).toBe('POST')
  })

  it('baseUrl 접근', () => {
    const client = createApiClient('https://api.example.com')
    expect(client.baseUrl).toBe('https://api.example.com')
  })
})

describe('scheduledSendEmail (Parameters)', () => {
  it('body에 [Scheduled] 접두사 추가', () => {
    const result = scheduledSendEmail('kim@test.com', 'Hello', 'Meeting tomorrow')
    expect(result).toContain('[Scheduled]')
    expect(result).toContain('kim@test.com')
    expect(result).toContain('Hello')
  })
})
