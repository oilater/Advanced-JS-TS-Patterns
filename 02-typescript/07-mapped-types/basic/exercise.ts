// 기초 과제: keyof와 인덱스 타입

/**
 * 과제 1: 안전한 필드 업데이트 (불변)
 *
 * const user = { name: 'kim', age: 25 }
 * updateField(user, 'name', 'lee') → { name: 'lee', age: 25 }
 * // 원본은 변경되지 않음
 * // updateField(user, 'name', 123) → 타입 에러! name은 string
 */
export function updateField<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
): T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 모든 값을 boolean(truthy/falsy)으로 변환
 *
 * toBooleanFlags({ name: 'kim', age: 0 }) → { name: true, age: false }
 * toBooleanFlags({ value: '' })            → { value: false }
 */
export function toBooleanFlags<T extends object>(obj: T): Record<keyof T, boolean> {
  throw new Error('구현해보세요!')
}
