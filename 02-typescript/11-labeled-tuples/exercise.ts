/**
 * 라벨 튜플 — 직접 만들어보기
 */

// ============================================================
// 과제 1: 좌표 시스템
// ============================================================

type Point2D = [x: number, y: number]
type Point3D = [x: number, y: number, z: number]

function distance(a: Point2D, b: Point2D): number {
  const [x1, y1] = a
  const [x2, y2] = b
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

// ============================================================
// 과제 2: RGB 색상
// ============================================================

type RGB = [red: number, green: number, blue: number]
type RGBA = [red: number, green: number, blue: number, alpha: number]

function rgbToHex(color: RGB): string {
  // TODO: [255, 128, 0] → '#ff8000'
  throw new Error('구현해보세요!')
}

// ============================================================
// 과제 3: 범위와 구간
// ============================================================

type Range = [start: number, end: number]

function isInRange(value: number, range: Range): boolean {
  // TODO
  throw new Error('구현해보세요!')
}

function overlap(a: Range, b: Range): Range | null {
  // TODO: 두 범위의 교집합 반환, 없으면 null
  throw new Error('구현해보세요!')
}

export { distance, rgbToHex, isInRange, overlap }
export type { Point2D, Point3D, RGB, RGBA, Range }
