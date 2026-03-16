// 기초 과제: keyof와 인덱스 타입

/** 과제 1: 안전한 필드 업데이트 */
export function updateField<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
): T {
  // 불변성 유지하면서 특정 필드만 업데이트
  throw new Error('구현해보세요!')
}

/** 과제 2: 모든 값을 boolean으로 변환하는 함수 */
export function toBooleanFlags<T extends object>(obj: T): Record<keyof T, boolean> {
  // 각 프로퍼티를 truthy/falsy로 변환
  throw new Error('구현해보세요!')
}
