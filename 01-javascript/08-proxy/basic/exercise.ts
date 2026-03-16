// 기초 과제: 프로퍼티 접근과 Reflect

/**
 * 과제 1: 기본값이 있는 Proxy
 *
 * const config = withDefaults({ port: 3000 }, { port: 8080, host: 'localhost' })
 * config.port → 3000      (target에 있으니까)
 * config.host → 'localhost' (target에 없으니까 defaults에서)
 */
export function withDefaults<T extends object>(
  target: T,
  defaults: Record<string, any>,
): T {
  throw new Error('구현해보세요!')
}

/**
 * 과제 2: 읽기 전용 Proxy
 *
 * const obj = makeReadonly({ name: 'kim' })
 * obj.name       → 'kim'   (읽기 OK)
 * obj.name = 'x' → Error!  (쓰기 불가)
 * delete obj.name → Error!  (삭제 불가)
 */
export function makeReadonly<T extends object>(target: T): Readonly<T> {
  throw new Error('구현해보세요!')
}
