/**
 * 패턴 8: Proxy — 객체 동작 가로채기
 * 중요도: ★★★☆☆ | 난이도: ★★★
 *
 * 객체의 읽기/쓰기를 가로채서 자동으로 추가 동작을 실행.
 * MobX, Immer, Vue 반응성의 핵심!
 */

// ============================================================
// 1. Vitest 실제 코드: expect.poll()
//    packages/integrations/chai/poll.ts:66
// ============================================================

/**
 * Proxy 하나로 toBe, toEqual, toContain 등
 * 모든 matcher를 자동으로 폴링 로직으로 감쌈.
 */
function createPollingProxy(assertion: any) {
  const proxy: any = new Proxy(assertion, {
    get(target, key, receiver) {
      const assertionFunction = Reflect.get(target, key, receiver)

      if (typeof assertionFunction !== 'function') {
        return assertionFunction
      }

      // 모든 assertion 메서드를 자동으로 폴링 로직으로 감싼다
      return function (...args: any[]) {
        // 성공할 때까지 반복 실행하는 로직
        console.log(`Polling: ${String(key)}(${args})`)
      }
    },
  })
  return proxy
}

// ============================================================
// 2. React/실무 활용 예제
// ============================================================

// 2-1. 폼 유효성 검증
function validatedForm<T extends object>(
  initial: T,
  validators: Partial<Record<keyof T, (v: any) => boolean>>,
) {
  return new Proxy(initial, {
    set(target, key, value) {
      const validator = validators[key as keyof T]
      if (validator && !validator(value)) {
        throw new Error(`Invalid value for ${String(key)}: ${value}`)
      }
      ;(target as any)[key] = value
      return true
    },
  })
}

// 사용:
// const form = validatedForm(
//   { email: '', age: 0 },
//   { email: (v) => v.includes('@'), age: (v) => v > 0 }
// )
// form.email = 'test@test.com'  // OK
// form.email = 'invalid'        // Error!

// 2-2. 읽기 전용 설정
function readonly<T extends object>(target: T): Readonly<T> {
  return new Proxy(target, {
    set() {
      throw new Error('Cannot modify readonly object')
    },
    deleteProperty() {
      throw new Error('Cannot delete from readonly object')
    },
  })
}

// 2-3. 기본값이 있는 객체
function withDefaults<T extends object>(target: T, defaults: Partial<T>): T {
  return new Proxy(target, {
    get(obj, key) {
      const value = Reflect.get(obj, key)
      if (value === undefined) {
        return (defaults as any)[key]
      }
      return value
    },
  })
}

export { createPollingProxy, validatedForm, readonly, withDefaults }
