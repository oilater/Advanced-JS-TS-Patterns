/**
 * 기초 1: 참조와 가비지 컬렉션 (GC)
 *
 * WeakMap을 이해하려면 "참조"와 "가비지 컬렉션"을 먼저 알아야 한다.
 */

// ============================================================
// 참조 (Reference) 이해하기
// ============================================================

// 변수는 객체를 "참조"한다 (화살표로 가리킨다)
let a = { name: 'kim' } // a → { name: 'kim' }
let b = a // b → 같은 객체를 가리킴

b.name = 'lee'
console.log(a.name) // 'lee' — 같은 객체니까!

// 참조 끊기
a = null as any // a가 더 이상 객체를 가리키지 않음
// 하지만 b가 아직 가리키고 있으므로 GC 안 됨

b = null as any // 이제 아무도 안 가리킴 → GC 대상!

// ============================================================
// 가비지 컬렉션 (GC) — 쓸모없는 메모리 자동 회수
// ============================================================

// JavaScript 엔진은 "아무도 참조하지 않는 객체"를 자동으로 메모리에서 제거
//
// GC 대상: 어떤 변수도 가리키지 않는 객체
// GC 아닌: 하나라도 참조가 있는 객체

function gcExample() {
  let obj: any = { heavy: new Array(1000000) } // 큰 객체
  // ... 사용 ...
  obj = null // 참조 끊기 → GC가 메모리 회수
}

// ============================================================
// Map — 참조를 유지해서 GC 방해 (메모리 누수 위험)
// ============================================================

function mapLeakDemo() {
  const metadata = new Map<object, string>()

  function process() {
    const bigData = { data: new Array(1000000) }
    metadata.set(bigData, '처리됨')
    // bigData를 더 이상 안 쓰는데...
    // Map이 참조를 유지하니까 GC가 안 됨!
  }

  process()
  // metadata에 bigData 참조가 남아있음 → 메모리 누수
  console.log(metadata.size) // 1 — 아직 있음
}

// ============================================================
// WeakMap — 약한 참조 → GC 허용
// ============================================================

function weakMapDemo() {
  const metadata = new WeakMap<object, string>()

  function process() {
    const bigData = { data: new Array(1000000) }
    metadata.set(bigData, '처리됨')
    // 함수 끝나면 bigData 참조 사라짐
    // WeakMap은 약한 참조라 GC 허용!
  }

  process()
  // bigData가 GC되면 WeakMap에서도 자동 제거
}

// ============================================================
// 과제 1: Map과 WeakMap의 차이 확인
// ============================================================

function compareMapAndWeakMap() {
  const regularMap = new Map<object, string>()
  const weakMap = new WeakMap<object, string>()

  let obj: any = { id: 1 }

  regularMap.set(obj, 'data')
  weakMap.set(obj, 'data')

  // TODO:
  // 1. regularMap.has(obj)와 weakMap.has(obj) 출력 → 둘 다 true
  // 2. obj = null 설정
  // 3. regularMap.size 출력 → 여전히 1 (참조 유지)
  // 4. WeakMap은 .size가 없음! (GC 타이밍을 모르니까)
  //    weakMap.has(obj)도 불가 (obj가 null이니까)
  throw new Error('구현해보세요!')
}

// ============================================================
// 과제 2: WeakMap의 제약 이해하기
// ============================================================

// WeakMap은 Map과 달리:
// ❌ .size 없음
// ❌ .keys(), .values(), .entries() 없음 (순회 불가)
// ❌ key가 객체만 가능 (string, number 불가)
// ✅ .get(), .set(), .has(), .delete()만 가능

// 왜? GC가 언제 동작할지 모르니까 "지금 몇 개 있는지"를 보장할 수 없음

export { compareMapAndWeakMap }
