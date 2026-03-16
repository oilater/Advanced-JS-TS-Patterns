/**
 * 패턴 4: Deferred Promise — 외부에서 resolve/reject
 * 중요도: ★★★★☆ | 난이도: ★★★
 *
 * 보통 Promise는 생성자 안에서만 resolve 가능.
 * 하지만 "나중에 어딘가에서" resolve 하고 싶을 때가 있다.
 * 이벤트 기반 코드의 핵심!
 */

// ============================================================
// 1. Vitest 실제 코드
//    packages/utils/src/helpers.ts:270
// ============================================================

type DeferPromise<T> = Promise<T> & {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

function createDefer<T>(): DeferPromise<T> {
  let resolve: ((value: T | PromiseLike<T>) => void) | null = null
  let reject: ((reason?: any) => void) | null = null

  const p = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as DeferPromise<T>

  p.resolve = resolve!
  p.reject = reject!
  return p
}

// ============================================================
// 2. React/실무 활용 예제
// ============================================================

// 2-1. 모달 확인 대기
function useConfirmDialogExample() {
  // const deferRef = useRef<DeferPromise<boolean>>()
  //
  // const confirm = (message: string): Promise<boolean> => {
  //   const defer = createDefer<boolean>()
  //   deferRef.current = defer
  //   setMessage(message)
  //   setOpen(true)
  //   return defer  // 사용자가 버튼 누를 때까지 대기
  // }
  //
  // const handleOk = () => { deferRef.current?.resolve(true); setOpen(false) }
  // const handleCancel = () => { deferRef.current?.resolve(false); setOpen(false) }
  //
  // // 사용:
  // if (await confirm('삭제할까요?')) { deleteItem() }
}

// 2-2. WebSocket 응답 대기
function webSocketRPCExample() {
  const pendingRequests = new Map<string, DeferPromise<any>>()

  function sendAndWait(ws: WebSocket, type: string, data: any): Promise<any> {
    const id = crypto.randomUUID()
    const defer = createDefer()
    pendingRequests.set(id, defer)
    ws.send(JSON.stringify({ id, type, data }))
    return defer // 응답 올 때까지 대기
  }

  // ws.onmessage = (event) => {
  //   const { id, result } = JSON.parse(event.data)
  //   pendingRequests.get(id)?.resolve(result)  // 여기서 resolve!
  //   pendingRequests.delete(id)
  // }
}

export { DeferPromise, createDefer }
