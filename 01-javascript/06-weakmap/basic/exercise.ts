// 기초 과제: 참조와 GC

/** 과제 1: Map과 WeakMap의 차이 확인 */
export function mapVsWeakMap() {
  const regularMap = new Map<object, string>()
  const weakMap = new WeakMap<object, string>()

  const obj = { id: 1 }
  regularMap.set(obj, 'data')
  weakMap.set(obj, 'data')

  return {
    mapHas: regularMap.has(obj),
    weakMapHas: weakMap.has(obj),
    mapSize: regularMap.size,
    // WeakMap은 .size가 없음!
  }
}
