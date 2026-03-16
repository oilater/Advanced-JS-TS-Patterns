import { describe, it, expect } from 'vitest'
import { double, pipe, makeGreeter, once, withCount } from './exercise'

describe('기초: 함수는 값이다', () => {
  it('double(5) → 10', () => {
    expect(double(5)).toBe(10)
  })

  it('double(0) → 0', () => {
    expect(double(0)).toBe(0)
  })

  it('double(-3) → -6', () => {
    expect(double(-3)).toBe(-6)
  })
})

describe('기초: pipe', () => {
  it('함수를 순서대로 적용한다', () => {
    const add1 = (x: number) => x + 1
    const times2 = (x: number) => x * 2
    expect(pipe(3, [add1, times2])).toBe(8) // (3+1)*2
  })

  it('빈 배열이면 원래 값 반환', () => {
    expect(pipe(5, [])).toBe(5)
  })

  it('함수 3개 이상도 동작한다', () => {
    const add1 = (x: number) => x + 1
    const times2 = (x: number) => x * 2
    const square = (x: number) => x ** 2
    expect(pipe(2, [add1, times2, square])).toBe(36) // ((2+1)*2)^2
  })
})

describe('기초: 클로저 — makeGreeter', () => {
  it('greeting을 기억한다', () => {
    const hello = makeGreeter('안녕')
    expect(hello('철수')).toBe('안녕, 철수!')
    expect(hello('영희')).toBe('안녕, 영희!')
  })

  it('다른 greeting으로 만들 수 있다', () => {
    const hi = makeGreeter('Hi')
    expect(hi('Kim')).toBe('Hi, Kim!')
  })
})

describe('기초: 클로저 — once', () => {
  it('fn을 한 번만 실행한다', () => {
    let callCount = 0
    const fn = once(() => {
      callCount++
      return 42
    })

    expect(fn()).toBe(42)
    expect(fn()).toBe(42)
    expect(fn()).toBe(42)
    expect(callCount).toBe(1)
  })
})

describe('기초: 함수 반환 — withCount', () => {
  it('호출 횟수를 추적한다', () => {
    const add = withCount((a: number, b: number) => a + b)

    expect(add(1, 2)).toBe(3)
    expect(add(3, 4)).toBe(7)
    expect(add.count).toBe(2)
  })

  it('초기 count는 0이다', () => {
    const noop = withCount(() => {})
    expect(noop.count).toBe(0)
  })
})
