// 기초 과제: 프로퍼티 접근과 Reflect

/** 과제 1: 기본값이 있는 Proxy */
export function withDefaults<T extends object>(
  target: T,
  defaults: Record<string, any>,
): T {
  // target에 프로퍼티가 없으면 defaults에서 반환
  throw new Error('구현해보세요!')
}

/** 과제 2: 읽기 전용 Proxy */
export function makeReadonly<T extends object>(target: T): Readonly<T> {
  // set, deleteProperty 시 에러
  throw new Error('구현해보세요!')
}
