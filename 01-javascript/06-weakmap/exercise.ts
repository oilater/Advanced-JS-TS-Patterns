/**
 * WeakMap — 직접 만들어보기
 *
 * 목표: WeakMap을 활용한 GC 안전한 메타데이터 관리를 구현한다.
 */

// ============================================================
// 과제 1: weakMemoize — 객체 인자 기반 메모이제이션
// ============================================================

function weakMemoize<T extends object, R>(fn: (arg: T) => R): (arg: T) => R {
  // TODO: WeakMap으로 캐시 구현
  // 같은 객체 참조로 호출하면 캐시된 결과 반환
  throw new Error('구현해보세요!')
}

// 테스트:
// const getSize = weakMemoize((arr: number[]) => {
//   console.log('계산 중...')
//   return arr.length
// })
// const arr = [1, 2, 3]
// getSize(arr)  // "계산 중..." → 3
// getSize(arr)  // 캐시에서 (출력 없음) → 3
// getSize([4, 5])  // "계산 중..." → 2 (다른 참조)

// ============================================================
// 과제 2: 객체에 숨겨진 메타데이터 부착
// ============================================================

class MetadataStore<T extends object, M> {
  // TODO: WeakMap으로 구현
  // - set(target, metadata): 메타데이터 저장
  // - get(target): 메타데이터 반환 (없으면 undefined)
  // - has(target): 메타데이터 존재 여부

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

// 테스트:
// const timestamps = new MetadataStore<object, number>()
// const obj = { name: 'test' }
// timestamps.set(obj, Date.now())
// console.log(timestamps.get(obj)) // timestamp 값
// console.log(timestamps.has(obj)) // true

// ============================================================
// 과제 3: 자동 cleanup이 되는 이벤트 핸들러 관리
// ============================================================

class SafeEventManager {
  // TODO: WeakMap<EventTarget, Map<string, Set<Function>>>
  // - on(target, event, handler): 핸들러 등록 + addEventListener
  // - off(target, event, handler): 핸들러 제거 + removeEventListener
  // - offAll(target): target의 모든 핸들러 제거
  // target이 GC되면 핸들러 정보도 자동 정리됨

  on(target: EventTarget, event: string, handler: EventListener): void {
    throw new Error('구현해보세요!')
  }

  off(target: EventTarget, event: string, handler: EventListener): void {
    throw new Error('구현해보세요!')
  }

  offAll(target: EventTarget): void {
    throw new Error('구현해보세요!')
  }
}

export { weakMemoize, MetadataStore, SafeEventManager }
