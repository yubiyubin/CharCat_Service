<div align="center">

<img src="public/logo.png" alt="CharCat Logo" width="400" />

### 무료 온라인 텍스트 도구 모음

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://charcat.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

**[charcat.vercel.app](https://charcat.vercel.app)**

설치 없이, 회원가입 없이, 브라우저에서 바로 사용하는 텍스트 도구.

</div>

---

## Features

| 도구 | 설명 | 경로 |
|------|------|------|
| **글자수 세기** | 문자수(공백 포함/제외), 단어수, 문장수, 줄수, 바이트 실시간 계산 | `/char-count` |
| **텍스트 비교** | 두 텍스트의 차이점을 글자 단위로 색상 시각화 (추가/삭제) | `/text-diff` |
| **한영 변환** | 한영키 오타 자동 변환 (`dkssud` → `안녕`, `ㅗ디ㅣㅐ` → `hello`) | `/kor-eng` |
| **자모 조합/분해** | 분리된 자음·모음을 완성된 한글로 조합 (`ㅇㅏㄴㄴㅕㅇ` → `안녕`) | `/jamo-compose` |

### 공통 기능

- 다크모드 / 라이트모드 (시스템 설정 연동)
- 한국어 / English 다국어 지원
- 결과 클립보드 복사
- 모바일 반응형 UI

## Tech Stack

| 영역 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (Strict) |
| UI | Tailwind CSS 4, shadcn/ui, Radix UI |
| Icons | Lucide React |
| Theme | next-themes |
| Text Diff | diff |
| Deploy | Vercel |

## Project Structure

```
src/
├── app/                    # Pages & Layouts (App Router)
│   ├── char-count/         # 글자수 세기
│   ├── text-diff/          # 텍스트 비교
│   ├── kor-eng/            # 한영 변환
│   └── jamo-compose/       # 자모 조합/분해
├── components/             # 공통 컴포넌트 (Header, Footer, Toast 등)
├── features/               # 기능별 컴포넌트 & 유틸리티
│   ├── char-count/
│   └── kor-eng/
├── contexts/               # LanguageContext (i18n)
├── hooks/                  # Custom Hooks
├── locales/                # 번역 파일 (ko, en)
├── utils/                  # 한글 자모 조합/분해 알고리즘
└── styles.ts               # Tailwind 클래스 프리셋
```

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## Scripts

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |

## License

MIT License
