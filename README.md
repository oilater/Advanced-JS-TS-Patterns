# Advanced JS/TS Patterns

Vitest에 자주 쓰이는 JS/TS 중고급 패턴을 공부하고 실습합니다.

각 폴더에 `concept.ts`(개념 + Vitest 실제 코드 + 실무 활용)와 `exercise.ts`(직접 만들어보기)가 있습니다.

concept이 어렵게 느껴지면 `basic/` 폴더의 기초 파일부터 시작하세요.
`basic/` → `concept.ts` → `exercise.ts` 순서로 학습하면 됩니다.

---

## 폴더 구조

```
01-javascript/
  01-higher-order-functions/   ★★★★★  함수를 감싸서 기능 추가
  02-abort-controller/         ★★★★★  취소 가능한 비동기 작업
  03-promise-deduplication/    ★★★★☆  같은 요청 1번만 실행
  04-deferred-promise/         ★★★★☆  외부에서 resolve/reject
  05-lazy-initialization/      ★★★★☆  처음 쓸 때만 계산
  06-weakmap/                  ★★★☆☆  GC 안전한 메타데이터
  07-symbol/                   ★★★☆☆  숨겨진 프라이빗 키
  08-proxy/                    ★★★☆☆  객체 동작 가로채기
  09-error-stack-replacement/  ★★★☆☆  디버깅 위치 개선

02-typescript/
  01-generic/                  ★★☆  타입을 변수처럼
  02-type-guard/               ★★☆  런타임 체크로 타입 좁히기
  03-discriminated-union/      ★★☆  type 필드로 자동 분기
  04-utility-types/            ★★☆  Partial, Omit, Pick 등
  05-conditional-types/        ★★★  타입 레벨 if/else + infer
  06-function-overload/        ★★☆  인자별 다른 반환 타입
  07-mapped-types/             ★★★  타입 변환 반복문
  08-module-augmentation/      ★★☆  외부 라이브러리 타입 확장
  09-satisfies/                ★☆☆  검증 + 추론 유지
  10-as-const/                 ★☆☆  리터럴 타입 고정
  11-labeled-tuples/           ★☆☆  의미 있는 배열 타입
  12-return-type-typeof/       ★★☆  값에서 타입 추출
```

---

## basic/ 폴더 (선행 학습)

concept이 어려울 때 먼저 풀어보는 기초 파일들:

```
01-javascript/
  01-higher-order-functions/basic/
    01-functions-as-values.ts   함수는 값이다 (변수에 담기, 인자로 전달)
    02-closures.ts              클로저 (스코프 기억, 캡슐화)
    03-returning-functions.ts   함수를 반환하는 함수 → HOF로 연결

  02-abort-controller/basic/
    01-promise-basics.ts        Promise 3상태, then/catch, async/await
    02-event-listeners.ts       addEventListener/cleanup 패턴

  03-promise-deduplication/basic/
    01-map-basics.ts            Map 사용법, 간단한 캐시
    02-promise-chaining.ts      then/catch/finally, 공유 Promise

  04-deferred-promise/basic/
    01-promise-constructor.ts   resolve/reject 함수의 정체, 외부 저장

  06-weakmap/basic/
    01-references-and-gc.ts     참조, 가비지 컬렉션, Map vs WeakMap

  08-proxy/basic/
    01-property-access.ts       프로퍼티 접근 내부 동작, Reflect

  09-error-stack-replacement/basic/
    01-error-object.ts          Error 객체 구조, stack 문자열 조작

02-typescript/
  01-generic/basic/
    01-type-annotations.ts      기본 타입 어노테이션
    02-why-generic.ts           any의 문제 → Generic의 필요성

  02-type-guard/basic/
    01-union-types.ts           유니온 타입, typeof/instanceof 좁히기

  05-conditional-types/basic/
    01-extends-keyword.ts       extends의 두 가지 의미 (상속 vs 할당가능성)

  07-mapped-types/basic/
    01-keyof-and-index.ts       keyof, T[K], [K in keyof T] 기본
```

---

## 학습 순서

### JavaScript (4주)

```
Week 1: 매일 쓰는 패턴
  01-HOF → 02-AbortController → 05-Lazy Init

Week 2: 비동기 고급
  03-Promise 중복제거 → 04-Deferred Promise

Week 3: 라이브러리/프레임워크 수준
  06-WeakMap → 07-Symbol → 08-Proxy

Week 4: 에러 처리 고급 + 종합
  09-에러 스택 교체 + 위 패턴들 조합 미니 프로젝트
```

### TypeScript (3주)

```
Week 1: 기초 — 바로 쓸 수 있는 것들
  10-as const → 09-satisfies → 11-라벨 튜플 → 04-Utility Types

Week 2: 중급 — 코드 읽기에 필수
  01-Generic → 02-타입 가드 → 03-판별 유니온 → 06-함수 오버로드

Week 3: 고급 — 라이브러리 설계 수준
  05-조건부 타입 → 07-Mapped Types → 08-모듈 확장 → 12-ReturnType
```

---

## 학습 방법

1. `concept.ts`를 읽으며 패턴의 **왜 → 어떻게 → 어디서** 이해
2. `exercise.ts`의 과제를 **직접 풀기** (답 보지 말고!)
3. Vitest에서 해당 패턴이 쓰인 파일을 **직접 열어서** 전체 맥락 읽기
4. 실무 프로젝트에서 **적용할 곳 찾기**
