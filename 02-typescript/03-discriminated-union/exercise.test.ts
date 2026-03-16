import { describe, it, expect } from 'vitest'
import { describeEvent, divide, getEventIcon, type FileEvent } from './exercise'

describe('describeEvent', () => {
  it('created 이벤트', () => {
    const e: FileEvent = { type: 'created', path: '/a.ts', content: 'hello' }
    expect(describeEvent(e)).toBe('Created /a.ts')
  })

  it('modified 이벤트', () => {
    const e: FileEvent = { type: 'modified', path: '/b.ts', oldContent: 'old', newContent: 'new' }
    expect(describeEvent(e)).toBe('Modified /b.ts')
  })

  it('deleted 이벤트', () => {
    const e: FileEvent = { type: 'deleted', path: '/c.ts' }
    expect(describeEvent(e)).toBe('Deleted /c.ts')
  })
})

describe('divide (Result 타입)', () => {
  it('정상 나눗셈', () => {
    const result = divide(10, 2)
    expect(result).toEqual({ ok: true, value: 5 })
  })

  it('0으로 나누면 에러', () => {
    const result = divide(10, 0)
    expect(result).toEqual({ ok: false, error: 'Division by zero' })
  })
})

describe('getEventIcon', () => {
  it('각 이벤트 타입별 아이콘', () => {
    expect(getEventIcon({ type: 'created', path: '', content: '' })).toBe('+')
    expect(getEventIcon({ type: 'modified', path: '', oldContent: '', newContent: '' })).toBe('~')
    expect(getEventIcon({ type: 'deleted', path: '' })).toBe('-')
  })
})
