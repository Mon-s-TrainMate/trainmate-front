# TrainMate Frontend

Next.js로 구축된 현대적인 피트니스 트레이닝 관리 플랫폼으로, 트레이너와 회원을 연결하여 효과적인 운동 추적 및 진행 상황 모니터링을 제공합니다.

## 개요

TrainMate는 개인 트레이너가 회원을 관리하고 운동 진행 상황을 효율적으로 추적할 수 있도록 하는 포괄적인 피트니스 관리 애플리케이션입니다. 이 플랫폼은 역할 기반 접근 제어를 통해 트레이너와 회원을 모두 지원하며, 각 사용자 유형에 맞춤화된 경험을 제공합니다.

### 주요 기능

- **사용자 관리**: 트레이너와 회원을 모두 지원하는 이중 역할 시스템
- **보안 인증**: JWT 기반 세션을 통한 다단계 등록 프로세스
- **회원 프로필**: 포괄적인 회원 정보 및 진행 상황 추적
- **운동 기록**: 세트, 횟수, 무게를 포함한 상세한 운동 로깅
- **진행 상황 추적**: 과거 운동 데이터 조회
- **모바일 반응형**: 데스크톱과 모바일 디바이스 모두에 최적화
- **현대적인 UI**: 깔끔하고 직관적인 인터페이스

## 기술 스택

### 핵심 기술

- **[Next.js 15](https://nextjs.org/)** - App Router를 사용한 React 프레임워크
- **[React 19](https://react.dev/)** - 동시성 기능을 포함한 최신 React
- **[TypeScript](https://www.typescriptlang.org/)** - 타입 안전한 JavaScript
- **[TailwindCSS v4](https://tailwindcss.com/)** - 유틸리티 우선 CSS 프레임워크

### UI & 스타일링

- **[shadcn/ui](https://ui.shadcn.com/)** - 재사용 가능한 컴포넌트 라이브러리
- **[Radix UI](https://www.radix-ui.com/)** - 헤드리스 UI 프리미티브
- **[Pretendard](https://github.com/orioncactus/pretendard)** - 한국어 웹 폰트

### 상태 관리 & 데이터 페칭

- **[TanStack Query](https://tanstack.com/query/)** - 강력한 데이터 동기화
- **[React Hook Form](https://react-hook-form.com/)** - 검증 기능을 갖춘 고성능 폼
- **[Zod](https://zod.dev/)** - TypeScript 우선 스키마 검증

### 개발 도구

- **[Storybook](https://storybook.js.org/)** - 컴포넌트 개발 환경
- **[Playwright](https://playwright.dev/)** - 엔드투엔드 테스트 프레임워크
- **[MSW](https://mswjs.io/)** - 개발 및 테스트용 API 모킹
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - 코드 품질 및 포맷팅
- **[Lefthook](https://github.com/evilmartians/lefthook)** - Git 훅 관리

### 인증 & 보안

- **[JOSE](https://github.com/panva/jose)** - 보안 세션을 위한 JWT 구현
- 역할 기반 접근 제어 (트레이너/회원)
- 토큰 새로 고침 기능을 갖춘 보안 세션 관리

## 시작하기

### 사전 요구사항

- **Node.js** 18.0.0 이상
- **npm** 패키지 매니저
- 버전 관리용 **Git**

### 설치

1. **저장소 복제**

   ```bash
   git clone <repository-url>
   cd trainmate-front
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 설정**

   ```bash
   # 환경 파일 생성
   cp .env.example .env.local
   ```

4. **개발 서버 시작**

   ```bash
   npm run dev
   ```

5. **브라우저 열기**
   [http://localhost:3000](http://localhost:3000)으로 이동

### Mock API를 사용한 개발

프로젝트는 MSW로 구동되는 포괄적인 mock API를 포함합니다:

```bash
# mock 서버 시작 (별도 터미널에서, bun 필요)
bun mock
```

이것은 개발 중 모든 기능에 대해 현실적인 API 응답을 제공합니다.

## 사용 가능한 스크립트

| 명령어                    | 설명                              |
| ------------------------- | --------------------------------- |
| `npm run dev`             | Turbopack으로 개발 서버 시작      |
| `npm run build`           | 프로덕션 애플리케이션 빌드        |
| `npm run start`           | 프로덕션 서버 시작                |
| `npm run lint`            | 코드 품질을 위한 ESLint 실행      |
| `npm run format`          | Prettier로 코드 포맷팅            |
| `npm run test:e2e`        | Playwright 엔드투엔드 테스트 실행 |
| `npm run test:e2e:ui`     | UI와 함께 Playwright 테스트 실행  |
| `npm run storybook`       | Storybook 개발 서버 시작          |
| `npm run build-storybook` | 프로덕션용 Storybook 빌드         |
| `npm run mock`            | MSW mock 서버 시작                |

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router 페이지
│   ├── (me)/                    # 인증된 사용자 라우트
│   │   ├── (with-header)/       # 헤더 레이아웃이 있는 라우트
│   │   │   ├── (with-members)/  # 회원 관리 페이지
│   │   │   └── (with-records)/  # 운동 기록 페이지
│   │   └── auth/                # 인증 페이지
│   ├── globals.css              # 전역 스타일 및 CSS 변수
│   ├── layout.tsx               # 루트 레이아웃 컴포넌트
│   └── provider.tsx             # 앱 전역 프로바이더
├── components/
│   └── ui/                      # 재사용 가능한 UI 컴포넌트
│       ├── button.tsx           # 변형이 있는 버튼 컴포넌트
│       ├── input.tsx            # 폼 입력 컴포넌트
│       ├── dialog.tsx           # 모달 다이얼로그 컴포넌트
│       └── ...                  # 기타 shadcn/ui 컴포넌트
├── features/                    # 기능 기반 모듈
│   ├── auth/                    # 인증 기능
│   │   ├── actions/             # 서버 액션
│   │   ├── api/                 # API 클라이언트 함수
│   │   ├── hooks/               # React 훅
│   │   ├── ui/                  # 기능별 컴포넌트
│   │   ├── schema.ts            # Zod 스키마
│   │   └── types.ts             # TypeScript 타입
│   ├── member/                  # 회원 관리 기능
│   ├── workouts/                # 운동 추적 기능
│   └── user/                    # 사용자 프로필 기능
├── lib/                         # 공유 유틸리티
│   ├── hooks/                   # 커스텀 React 훅
│   ├── utils.ts                 # 유틸리티 함수
│   └── schema.ts                # 공통 Zod 스키마
└── mocks/                       # MSW mock 서버 설정
    ├── handlers/                # API 라우트 핸들러
    ├── data.ts                  # Mock 데이터
    └── dev-server.ts            # 개발 mock 서버
```

### 아키텍처 원칙

- **기능 기반 구성**: 각 기능은 자체 API, 훅, UI 및 타입을 포함한 독립적인 구성
- **관심사 분리**: 데이터 페칭, 상태 관리, UI 컴포넌트 간의 명확한 분리
- **타입 안전성**: Zod 스키마 검증을 통한 포괄적인 TypeScript 커버리지
- **컴포넌트 재사용성**: 일관된 디자인 시스템을 갖춘 공유 UI 컴포넌트
- **서버 사이드 렌더링**: 최적의 성능을 위한 Next.js SSR 활용

## 컴포넌트 개발

### Storybook 통합

모든 UI 컴포넌트는 Storybook에서 문서화되고 테스트 가능합니다:

```bash
npm run storybook
```

컴포넌트 라이브러리를 보려면 [http://localhost:6006](http://localhost:6006)을 방문하세요.

### 컴포넌트 예제

프로젝트는 다음에 대한 포괄적인 스토리를 포함합니다:

- 폼 컴포넌트 (Button, Input, Checkbox, Select)
- 데이터 표시 컴포넌트 (UserMetrics, DataValue)
- 레이아웃 컴포넌트
- 기능별 컴포넌트

### 디자인 시스템

애플리케이션은 다음과 같은 일관된 디자인 시스템을 사용합니다:

- **컬러 팔레트**: 메인 브랜드 컬러, 그레이 스케일, 의미적 컬러
- **타이포그래피**: 한국어 콘텐츠에 최적화된 Pretendard 폰트 패밀리
- **간격**: Tailwind 유틸리티를 사용한 일관된 간격 스케일
- **반지름**: 표준화된 보더 반지름 값
- **그림자**: 깊이를 위한 다중 고도 레벨

## 인증 및 사용자 관리

### 사용자 유형

- **트레이너**: 여러 회원 관리, 모든 운동 데이터 조회, 운동 계획 생성 및 수정 가능
- **회원**: 개인 운동 기록 조회, 프로필 정보 업데이트 가능

### 인증 플로우

1. **등록**: 사용자 정보 및 선호사항을 수집하는 다단계 프로세스
2. **로그인**: "로그인 상태 유지" 옵션이 있는 이메일/비밀번호 인증
3. **세션 관리**: 자동 토큰 새로 고침 기능을 갖춘 JWT 기반 세션
4. **역할 기반 접근**: 사용자 유형에 따른 다른 UI 및 권한

### 보호된 라우트

모든 주요 애플리케이션 라우트는 `AuthGuard` 컴포넌트로 보호되어, 인증되지 않은 사용자를 자동으로 로그인 페이지로 리디렉션합니다.

## 핵심 기능

### 회원 관리

- 회원 프로필 생성 및 편집
- 개인 정보 추적
- 운동 세션을 위한 회원 선택
- 진행 상황 개요 및 통계

### 운동 기록

- 상세한 정보를 포함한 운동 데이터베이스
- 세트별 운동 로깅
- 무게, 횟수, 지속 시간 추적
- 신체 부위 및 장비별 운동 분류

### 진행 상황 추적

- 과거 운동 데이터 시각화
- 성능 지표 및 분석
- 진행 상황 사진 및 측정
- 목표 설정 및 달성 추적

## 테스트 전략

### 엔드투엔드 테스트

```bash
npm run test:e2e        # 모든 E2E 테스트 실행
npm run test:e2e:ui     # UI와 함께 테스트 실행
```

### 컴포넌트 테스트

- Storybook은 시각적 테스트 환경 역할
- 컴포넌트 스토리는 UI 컴포넌트의 단위 테스트 역할

### API 테스트

- MSW는 일관된 mock API 응답 제공
- 통합 테스트는 API 상호작용 검증

## 개발 가이드라인

### 코드 스타일

- **ESLint**: 코드 품질 및 일관성 강제
- **Prettier**: 자동 코드 포맷팅
- **TypeScript**: 엄격한 타입 검사 활성화
- **Import 정리**: 일관된 import 순서 및 그룹화

### Git 워크플로우

- **Lefthook**: 코드 품질을 위한 자동화된 pre-commit 훅
- **Conventional Commits**: 표준화된 커밋 메시지 형식
- **브랜치 보호**: 필수 검사가 있는 메인 브랜치 보호

### 성능 최적화

- **Next.js App Router**: 최적의 번들 분할 및 로딩
- **TanStack Query**: 지능적인 캐싱 및 백그라운드 업데이트
- **이미지 최적화**: Next.js를 통한 자동 이미지 최적화
- **코드 분할**: 최적의 로딩을 위한 기능 기반 코드 구성

## API 통합

### Mock 개발

프로젝트는 API 시뮬레이션을 위해 MSW(Mock Service Worker)를 사용합니다:

- 현실적인 HTTP 응답
- 오류 상황 테스트
- 오프라인 개발 기능
- 팀 구성원 간 일관된 데이터

### 데이터 페칭 패턴

```typescript
// 예제: 데이터 페칭을 위한 TanStack Query 사용
const { data: members, isLoading } = useMemberList();
const updateMember = useUpdateMemberProfile();
```

### 오류 처리

- 런타임 오류를 위한 전역 오류 경계
- 사용자 친화적인 메시지가 있는 폼 검증
- 재시도 메커니즘이 있는 API 오류 처리

## 배포

### 빌드 프로세스

```bash
npm run build          # 프로덕션 빌드 생성
npm run start          # 프로덕션 서버 시작
```

### 환경 구성

- 프로덕션 환경 변수
- API 엔드포인트 구성
- 인증 키 및 시크릿

### 성능 모니터링

- Web Vitals 추적
- 오류 모니터링 통합 준비
- 분석 통합 포인트 사용 가능

## 기여하기

1. 저장소를 **포크**합니다
2. 기능 브랜치를 **생성**합니다 (`git switch -c feat/amazing-feature`)
3. 변경사항을 **커밋**합니다 (`git commit -m 'feat: add amazing feature'`)
4. 브랜치에 **푸시**합니다 (`git push origin feat/amazing-feature`)
5. **Pull Request**를 엽니다

### 개발 표준

- TypeScript 모범 사례를 따르세요
- 포괄적인 컴포넌트 스토리를 작성하세요
- 적절한 오류 처리를 포함하세요
- 일관된 코드 포맷팅을 유지하세요
- 적절한 문서를 추가하세요

## License

This project is proprietary software. All rights reserved.

---

질문, 이슈 또는 기여에 대해서는 프로젝트 문서를 참조하거나 개발팀에 문의하세요.
