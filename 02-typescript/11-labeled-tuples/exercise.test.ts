import { describe, it, expect } from 'vitest'
import { distance, rgbToHex, overlap } from './exercise'

describe('distance', () => {
  it('같은 점이면 0', () => {
    expect(distance([0, 0], [0, 0])).toBe(0)
  })

  it('수평 거리', () => {
    expect(distance([0, 0], [3, 0])).toBe(3)
  })

  it('대각선 거리 (3-4-5 삼각형)', () => {
    expect(distance([0, 0], [3, 4])).toBe(5)
  })
})

describe('rgbToHex', () => {
  it('[255, 0, 0] → #ff0000', () => {
    expect(rgbToHex([255, 0, 0])).toBe('#ff0000')
  })

  it('[0, 128, 255] → #0080ff', () => {
    expect(rgbToHex([0, 128, 255])).toBe('#0080ff')
  })

  it('[0, 0, 0] → #000000', () => {
    expect(rgbToHex([0, 0, 0])).toBe('#000000')
  })
})

describe('overlap', () => {
  it('겹치는 부분 반환', () => {
    expect(overlap([1, 5], [3, 8])).toEqual([3, 5])
  })

  it('겹치지 않으면 null', () => {
    expect(overlap([1, 3], [5, 8])).toBeNull()
  })

  it('하나가 다른 하나를 포함', () => {
    expect(overlap([1, 10], [3, 7])).toEqual([3, 7])
  })

  it('경계만 닿으면', () => {
    expect(overlap([1, 5], [5, 10])).toEqual([5, 5])
  })
})
