import { describe, it, expect } from 'vitest'
import { withDefaults, makeReadonly } from './exercise'

describe('withDefaults', () => {
  it('target에 있는 값 반환', () => {
    const obj = withDefaults({ port: 3000 }, { port: 8080 })
    expect((obj as any).port).toBe(3000)
  })

  it('target에 없으면 defaults에서 반환', () => {
    const obj = withDefaults({} as any, { host: 'localhost' })
    expect((obj as any).host).toBe('localhost')
  })
})

describe('makeReadonly', () => {
  it('읽기는 가능', () => {
    const obj = makeReadonly({ name: 'kim' })
    expect((obj as any).name).toBe('kim')
  })

  it('쓰기 시 에러', () => {
    const obj = makeReadonly({ x: 1 })
    expect(() => { (obj as any).x = 2 }).toThrow()
  })

  it('삭제 시 에러', () => {
    const obj = makeReadonly({ x: 1 })
    expect(() => { delete (obj as any).x }).toThrow()
  })
})
