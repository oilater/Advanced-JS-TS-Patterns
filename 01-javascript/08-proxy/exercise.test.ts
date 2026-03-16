import { describe, it, expect, vi } from 'vitest'
import { onChange, withAccessLog, readonlyWithDefaults } from './exercise'

describe('onChange', () => {
  it('프로퍼티 변경 시 콜백 호출', () => {
    const cb = vi.fn()
    const state = onChange({ count: 0, name: 'kim' }, cb)

    state.count = 1
    expect(cb).toHaveBeenCalledWith('count', 1, 0)

    state.name = 'lee'
    expect(cb).toHaveBeenCalledWith('name', 'lee', 'kim')
  })

  it('값이 실제로 변경된다', () => {
    const state = onChange({ x: 10 }, () => {})
    state.x = 20
    expect(state.x).toBe(20)
  })
})

describe('withAccessLog', () => {
  it('프로퍼티 접근을 기록', () => {
    const user = withAccessLog({ name: 'kim', age: 25 })

    user.name
    user.age
    user.name

    expect(user._accessLog).toEqual(['name', 'age', 'name'])
  })

  it('_accessLog 접근 자체는 기록하지 않음', () => {
    const obj = withAccessLog({ x: 1 })
    obj.x
    const log = obj._accessLog // 이건 기록 안 됨

    expect(log).toEqual(['x'])
  })
})

describe('readonlyWithDefaults', () => {
  it('target에 있는 값 반환', () => {
    const obj = readonlyWithDefaults(
      { port: 3000 } as any,
      { port: 8080, host: 'localhost' },
    )
    expect((obj as any).port).toBe(3000)
  })

  it('target에 없으면 defaults에서 반환', () => {
    const obj = readonlyWithDefaults(
      {} as any,
      { host: 'localhost', port: 8080 },
    )
    expect((obj as any).host).toBe('localhost')
  })

  it('쓰기 시도하면 에러', () => {
    const obj = readonlyWithDefaults({ x: 1 }, {})
    expect(() => { (obj as any).x = 2 }).toThrow()
  })
})
