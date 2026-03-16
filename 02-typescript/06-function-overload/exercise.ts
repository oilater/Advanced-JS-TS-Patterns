/**
 * 함수 오버로드 — 직접 만들어보기
 */

// ============================================================
// 과제 1: createElement 오버로드
// ============================================================

// - 태그가 'input'이면 HTMLInputElement 반환
// - 태그가 'div'이면 HTMLDivElement 반환
// - 그 외 문자열이면 HTMLElement 반환

function createElement(tag: 'input'): HTMLInputElement
function createElement(tag: 'div'): HTMLDivElement
function createElement(tag: string): HTMLElement
function createElement(tag: string): HTMLElement {
  // TODO
  return document.createElement(tag)
}

// const input = createElement('input')  // HTMLInputElement
// input.value  // OK! HTMLInputElement에 value가 있으니까
// const div = createElement('div')  // HTMLDivElement

// ============================================================
// 과제 2: 유연한 이벤트 리스너
// ============================================================

// addEventListener 오버로드:
// - event가 'click'이면 콜백에 MouseEvent 전달
// - event가 'keydown'이면 콜백에 KeyboardEvent 전달
// - 그 외면 Event 전달

function on(event: 'click', handler: (e: MouseEvent) => void): void
function on(event: 'keydown', handler: (e: KeyboardEvent) => void): void
function on(event: string, handler: (e: Event) => void): void
function on(event: string, handler: (e: any) => void): void {
  // TODO: document.addEventListener(event, handler)
}

// on('click', (e) => {
//   e.clientX  // OK! MouseEvent 타입
// })
// on('keydown', (e) => {
//   e.key  // OK! KeyboardEvent 타입
// })

export { createElement, on }
