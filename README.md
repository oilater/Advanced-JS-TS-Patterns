# Advanced JS/TS Patterns

Vitest에 자주 쓰이는 JS/TS 중고급 패턴을 공부하고 실습합니다.

## 시작하기

```bash
pnpm install
pnpm test                   # watch 모드 (파일 저장하면 자동 재실행)
pnpm test:run               # 전체 1회 실행
pnpm test:js                # JavaScript 과제만
pnpm test:ts                # TypeScript 과제만
pnpm vitest 01-javascript/01-higher-order-functions/basic  # 특정 폴더만
```

## 사용법

1. `concept.ts`를 읽고 패턴 이해
2. `exercise.ts`에서 `throw new Error('구현해보세요!')`를 구현으로 교체
3. `pnpm test`로 통과 확인 — 빨간불 → 초록불!

concept이 어렵다면 `basic/` 폴더부터 시작하세요.

---

## 파일 구조

```
각 주제 폴더/
  concept.ts          ← 개념 설명 (읽기 전용)
  exercise.ts         ← 함수 스텁 (여기에 구현!)
  exercise.test.ts    ← Vitest 테스트 (건드리지 않음)
  basic/              ← 선행 학습 (있는 경우)
    0x-xxx.ts         ← 기초 개념 설명
    exercise.ts       ← 기초 과제
    exercise.test.ts  ← 기초 테스트
```

---

## 폴더 목록

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
  09-에러 스택 교체
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

### 각 주제 학습 흐름

```
basic이 있으면:
  basic 개념 읽기 → basic exercise 풀기 → concept.ts 읽기 → exercise 풀기

basic이 없으면:
  concept.ts 읽기 → exercise 풀기
```
