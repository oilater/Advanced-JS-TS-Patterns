// 라벨 튜플 과제

export type Point2D = [x: number, y: number]
export type RGB = [red: number, green: number, blue: number]
export type Range = [start: number, end: number]

/**
 * 과제 1: 두 점 사이의 거리
 *
 * distance([0, 0], [3, 4]) → 5  (3-4-5 삼각형)
 * distance([0, 0], [0, 0]) → 0
 */
export function distance(a: Point2D, b: Point2D): number {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: RGB를 hex 문자열로 변환
 *
 * rgbToHex([255, 0, 0])   → '#ff0000'
 * rgbToHex([0, 128, 255]) → '#0080ff'
 * rgbToHex([0, 0, 0])     → '#000000'
 */
export function rgbToHex(color: RGB): string {
  throw new Error('구현해보세요!')
}

/**
 * 과제 3: 두 범위의 교집합
 *
 * overlap([1, 5], [3, 8])  → [3, 5]
 * overlap([1, 3], [5, 8])  → null   (겹치지 않음)
 * overlap([1, 10], [3, 7]) → [3, 7] (포함)
 * overlap([1, 5], [5, 10]) → [5, 5] (경계만)
 */
export function overlap(a: Range, b: Range): Range | null {
  throw new Error('구현해보세요!')
}
