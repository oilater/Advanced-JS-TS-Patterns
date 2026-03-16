import { describe, it, expect } from 'vitest'
import { countWords, getOrCreate, sharedPromise } from './exercise'

describe('countWords', () => {
  it('각 단어의 빈도를 센다', () => {
    const result = countWords(['a', 'b', 'a', 'c', 'b', 'a'])
    expect(result.get('a')).toBe(3)
    expect(result.get('b')).toBe(2)
    expect(result.get('c')).toBe(1)
  })

  it('빈 배열이면 빈 Map', () => {
    expect(countWords([]).size).toBe(0)
  })
})

describe('getOrCreate', () => {
  it('key가 없으면 factory로 생성', () => {
    const m = new Map<string, number[]>()
    const arr = getOrCreate(m, 'list', () => [])
    arr.push(1)

    expect(m.get('list')).toEqual([1])
  })

  it('key가 있으면 기존 값 반환 (factory 호출 안 함)', () => {
    const m = new Map<string, number>()
    m.set('x', 42)

    let factoryCalled = false
    const result = getOrCreate(m, 'x', () => {
      factoryCalled = true
      return 0
    })

    expect(result).toBe(42)
    expect(factoryCalled).toBe(false)
  })
})

describe('sharedPromise', () => {
  it('같은 Promise를 여러 번 await하면 모두 같은 값', async () => {
    const [a, b, c] = await sharedPromise()
    expect(a).toBe(b)
    expect(b).toBe(c)
    expect(a).toBe(1)
  })
})
