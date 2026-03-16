// 라벨 튜플 과제

export type Point2D = [x: number, y: number]
export type RGB = [red: number, green: number, blue: number]
export type Range = [start: number, end: number]

/** 과제 1: 두 점 사이의 거리 */
export function distance(a: Point2D, b: Point2D): number {
  throw new Error('구현해보세요!')
}

/** 과제 2: RGB를 hex 문자열로 변환 */
export function rgbToHex(color: RGB): string {
  // [255, 128, 0] → '#ff8000'
  throw new Error('구현해보세요!')
}

/** 과제 3: 두 범위의 교집합 */
export function overlap(a: Range, b: Range): Range | null {
  // 겹치는 부분이 없으면 null
  throw new Error('구현해보세요!')
}
