// 기초 과제: 유니온 타입과 타입 좁히기

/** 과제 1: typeof로 안전하게 처리 */
export function formatValue(value: string | number | boolean): string {
  // string → 대문자, number → 소수점 2자리, boolean → 'Yes'/'No'
  throw new Error('구현해보세요!')
}

/** 과제 2: 배열인지 확인 후 합산 */
export function total(input: number | number[]): number {
  // number면 그대로, number[]면 합계
  throw new Error('구현해보세요!')
}

/** 과제 3: null-safe 길이 반환 */
export function getLength(value: string | null | undefined): number {
  throw new Error('구현해보세요!')
}
