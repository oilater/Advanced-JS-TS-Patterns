// WeakMap 과제

/** 과제 1: 객체 기반 메모이제이션 (같은 참조면 캐시) */
export function weakMemoize<T extends object, R>(fn: (arg: T) => R): (arg: T) => R {
  throw new Error('구현해보세요!')
}

/** 과제 2: 객체에 숨겨진 메타데이터 저장소 */
export class MetadataStore<T extends object, M> {
  set(target: T, metadata: M): void {
    throw new Error('구현해보세요!')
  }

  get(target: T): M | undefined {
    throw new Error('구현해보세요!')
  }

  has(target: T): boolean {
    throw new Error('구현해보세요!')
  }
}
