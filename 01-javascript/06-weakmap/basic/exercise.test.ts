import { describe, it, expect } from 'vitest'
import { mapVsWeakMap } from './exercise'

describe('Map vs WeakMap', () => {
  it('둘 다 has가 true', () => {
    const result = mapVsWeakMap()
    expect(result.mapHas).toBe(true)
    expect(result.weakMapHas).toBe(true)
  })

  it('Map은 size가 있고, WeakMap은 없다', () => {
    const result = mapVsWeakMap()
    expect(result.mapSize).toBe(1)

    // WeakMap은 size 프로퍼티가 없음을 확인
    const wm = new WeakMap()
    expect((wm as any).size).toBeUndefined()
  })

  it('WeakMap은 key가 객체만 가능', () => {
    const wm = new WeakMap()
    // @ts-expect-error string은 key로 불가
    expect(() => wm.set('string', 'value')).toThrow()
  })
})
