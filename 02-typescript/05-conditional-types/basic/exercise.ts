// 기초 과제: extends 키워드 이해

/** 과제 1: 문자열 길이 반환 (extends 제약) */
export function printLength<T extends string>(value: T): number {
  throw new Error('구현해보세요!')
}

/** 과제 2: 객체의 키 추출 (extends object 제약) */
export function getKeys<T extends object>(obj: T): string[] {
  throw new Error('구현해보세요!')
}
