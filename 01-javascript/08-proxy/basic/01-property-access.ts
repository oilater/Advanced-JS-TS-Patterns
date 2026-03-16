/**
 * 기초 1: 프로퍼티 접근과 Reflect
 *
 * Proxy를 이해하려면 JavaScript에서 객체 프로퍼티 접근이
 * 내부적으로 어떻게 동작하는지 알아야 한다.
 */

// ============================================================
// 프로퍼티 접근 = 내부 동작이 있다
// ============================================================

const user = { name: 'kim', age: 25 }

// 이 코드가 실행되면 내부적으로:
user.name // → [[Get]] 내부 메서드 호출
// user.name = 'lee'  // → [[Set]] 내부 메서드 호출
// 'name' in user     // → [[HasProperty]] 내부 메서드 호출
// delete user.name   // → [[Delete]] 내부 메서드 호출

// Proxy는 이 내부 메서드들을 "가로채는" 것!

// ============================================================
// Reflect — 내부 메서드를 직접 호출
// ============================================================

// Reflect는 객체의 기본 동작을 함수로 제공
Reflect.get(user, 'name') // === user.name
Reflect.set(user, 'name', 'lee') // === user.name = 'lee'
Reflect.has(user, 'name') // === 'name' in user
Reflect.deleteProperty(user, 'name') // === delete user.name

// 왜 Reflect가 필요하냐면?
// Proxy에서 "원래 동작도 실행하고 + 추가 동작도 하고 싶을 때" 씀

// ============================================================
// 가장 간단한 Proxy
// ============================================================

const simpleProxy = new Proxy(user, {
  // get 트랩: 프로퍼티를 읽을 때 가로채기
  get(target, key, receiver) {
    console.log(`읽기: ${String(key)}`)
    return Reflect.get(target, key, receiver) // 원래 동작 실행
  },

  // set 트랩: 프로퍼티를 쓸 때 가로채기
  set(target, key, value, receiver) {
    console.log(`쓰기: ${String(key)} = ${value}`)
    return Reflect.set(target, key, value, receiver)
  },
})

simpleProxy.name // "읽기: name" → 'lee'
// simpleProxy.age = 30  // "쓰기: age = 30"

// ============================================================
// 과제 1: 존재하지 않는 프로퍼티에 기본값 반환
// ============================================================

function withDefaults<T extends object>(target: T, defaults: Record<string, any>): T {
  // TODO: Proxy를 만들어서
  // target에 프로퍼티가 없으면 defaults에서 찾아 반환
  throw new Error('구현해보세요!')
}

// const config = withDefaults({ port: 3000 }, { port: 8080, host: 'localhost' })
// config.port  // 3000 (target에 있으니까)
// config.host  // 'localhost' (target에 없으니까 defaults에서)

// ============================================================
// 과제 2: 읽기 전용 Proxy
// ============================================================

function makeReadonly<T extends object>(target: T): Readonly<T> {
  // TODO: set과 deleteProperty를 가로채서 에러 던지기
  throw new Error('구현해보세요!')
}

// const frozen = makeReadonly({ name: 'kim', age: 25 })
// frozen.name      // 'kim' (읽기 OK)
// frozen.name = 'lee'  // Error: Cannot modify readonly object

// ============================================================
// 과제 3: 타입 체크 Proxy
// ============================================================

function typeChecked<T extends object>(
  target: T,
  types: Partial<Record<keyof T, string>>,
): T {
  // TODO: set을 가로채서 typeof 체크
  // types에 정의된 프로퍼티는 해당 타입만 허용
  throw new Error('구현해보세요!')
}

// const user = typeChecked(
//   { name: 'kim', age: 25 },
//   { name: 'string', age: 'number' }
// )
// user.name = 'lee'    // OK
// user.name = 123      // Error: name must be string
// user.age = 30        // OK
// user.age = 'thirty'  // Error: age must be number

export { withDefaults, makeReadonly, typeChecked }
