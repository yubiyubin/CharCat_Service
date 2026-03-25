import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// ─── 공통 mock ────────────────────────────────────────────────────────────────
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({
    language: "ko" as const,
    setLanguage: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        "home.heroTitle1": "CharCat",
        "home.heroTitle2": "텍스트 도구",
        "home.pickTool": "도구를 선택하세요",
        "home.heroSubtitle": "무료 온라인 텍스트 도구",
        "home.feature1Badge": "FREE",
        "home.feature1Title": "완전 무료",
        "home.feature1Desc": "모든 기능 무료",
        "home.feature2Badge": "FAST",
        "home.feature2Title": "빠른 속도",
        "home.feature2Desc": "실시간 변환",
        "home.feature3Badge": "SIMPLE",
        "home.feature3Title": "간편한 사용",
        "home.feature3Desc": "설치 불필요",
        "home.tools.charCountDesc": "문자 수를 실시간으로 계산합니다",
        "home.tools.korEngDesc": "잘못 입력한 한영 오타를 변환합니다",
        "home.tools.textDiffDesc": "두 텍스트의 차이를 시각화합니다",
        "home.tools.caseConvertDesc": "영문 케이스를 변환합니다",
        "home.tools.emojiDesc": "이모지를 검색하고 복사합니다",
        "home.tools.jamoComposeDesc": "자음과 모음을 한글로 조합합니다",
        "header.charCount": "글자수 세기",
        "header.korEng": "한영 변환",
        "header.textDiff": "텍스트 비교",
        "header.caseConvert": "대소문자",
        "header.emoji": "이모지",
        "header.jamoCompose": "자모 조합",
        // ConverterPage 공통
        "common.resultPlaceholder": "결과가 여기에 표시됩니다",
        "common.copyResult": "결과 복사",
        "common.clear": "초기화",
        "common.toast.resultCopied": "복사되었습니다",
        "common.toast.cleared": "초기화되었습니다",
        // caseConvert page
        "caseConvert.title": "대소문자 변환",
        "caseConvert.buttons.upper": "UPPERCASE",
        "caseConvert.buttons.lower": "lowercase",
        "caseConvert.buttons.title": "Title Case",
        "caseConvert.buttons.sentence": "Sentence case",
        "caseConvert.buttons.camel": "camelCase",
        "caseConvert.buttons.pascal": "PascalCase",
        "caseConvert.buttons.snake": "snake_case",
        "caseConvert.buttons.kebab": "kebab-case",
        "caseConvert.buttons.constant": "CONSTANT_CASE",
        "caseConvert.placeholder": "텍스트를 입력하세요",
        "caseConvert.sectionTitle": "대소문자 변환 사용법",
        "caseConvert.sectionDesc": "영문 텍스트를 다양한 케이스로 변환합니다",
        "caseConvert.examplesTitle": "변환 예시",
        "caseConvert.toast.copied": "복사되었습니다",
        "caseConvert.toast.cleared": "초기화되었습니다",
        "common.copy": "복사",
        "common.relatedToolsTitle": "다른 도구도 사용해보세요",
        // jamo page
        "jamoCompose.labelJamo": "자모",
        "jamoCompose.labelHangul": "한글",
        "jamoCompose.placeholderCompose": "자모 입력",
        "jamoCompose.placeholderDecompose": "한글 입력",
        "jamoCompose.titleCompose": "자모 조합",
        "jamoCompose.titleDecompose": "자모 분해",
        "jamoCompose.sectionTitle": "사용법",
        "jamoCompose.sectionDesc": "자모를 조합합니다",
        "jamoCompose.examplesTitle": "예시",
        // korEng page
        "korEng.title": "한영 변환",
        "korEng.labelEng": "영문",
        "korEng.labelKor": "한글",
        "korEng.placeholderEngToKor": "영문 입력",
        "korEng.placeholderKorToEng": "한글 입력",
        "korEng.sectionTitle": "사용법",
        "korEng.sectionDesc": "한영 자판 변환",
        "korEng.examplesTitle": "예시",
      };
      return translations[key] ?? key;
    },
  })),
}));

// dictionaries mock (case-convert/page.tsx가 직접 접근)
vi.mock("@/locales", () => ({
  dictionaries: {
    ko: {
      caseConvert: {
        examples: [
          { label: "UPPERCASE", from: "hello world", to: "HELLO WORLD" },
          { label: "camelCase", from: "hello world", to: "helloWorld" },
        ],
      },
      charCount: { section1Items: [], byteExamples: [] },
      textDiff: { useCases: [] },
    },
    en: {
      caseConvert: {
        examples: [
          { label: "UPPERCASE", from: "hello world", to: "HELLO WORLD" },
          { label: "camelCase", from: "hello world", to: "helloWorld" },
        ],
      },
      charCount: { section1Items: [], byteExamples: [] },
      textDiff: { useCases: [] },
    },
  },
}));

// next/link mock
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => React.createElement("a", { href }, children),
}));

describe("Home 페이지 — English 모드", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("영어 모드에서는 한영/자모 도구 미표시", async () => {
    const { useLanguage } = await import("@/contexts/LanguageContext");
    vi.mocked(useLanguage).mockReturnValueOnce({
      language: "en" as const,
      setLanguage: vi.fn(),
      t: (key: string) => {
        const en: Record<string, string> = {
          "home.heroTitle1": "CharCat",
          "home.heroTitle2": "Text Tools",
          "home.pickTool": "Pick a tool",
          "home.heroSubtitle": "Free online text tools",
          "home.feature1Badge": "FREE",
          "home.feature1Title": "Free",
          "home.feature1Desc": "All features free",
          "home.feature2Badge": "FAST",
          "home.feature2Title": "Fast",
          "home.feature2Desc": "Realtime conversion",
          "home.feature3Badge": "SIMPLE",
          "home.feature3Title": "Simple",
          "home.feature3Desc": "No install needed",
          "home.tools.charCountDesc": "Count characters in real-time",
          "home.tools.textDiffDesc": "Visualize text differences",
          "home.tools.caseConvertDesc": "Convert English case",
          "home.tools.emojiDesc": "Search and copy emojis",
          "header.charCount": "Character Count",
          "header.textDiff": "Text Diff",
          "header.caseConvert": "Case Convert",
          "header.emoji": "Emoji",
        };
        return en[key] ?? key;
      },
    });

    const { default: Home } = await import("@/app/page");
    render(<Home />);

    // 영어 모드: 한영/자모는 표시 안 됨 (ko 전용)
    expect(screen.queryByText("한영 변환")).toBeNull();
    expect(screen.queryByText("자모 조합")).toBeNull();
    // 공통 도구는 표시됨
    expect(screen.getAllByText("Character Count").length).toBeGreaterThan(0);
  });
});

describe("Home 페이지", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("페이지 제목 렌더링 (CharCat + 텍스트 도구)", async () => {
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    // h1에 "CharCat"과 "텍스트 도구"가 각각 텍스트 노드로 존재
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("CharCat");
    expect(heading).toHaveTextContent("텍스트 도구");
  });

  it("도구 카드 목록 렌더링", async () => {
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    expect(screen.getByText("글자수 세기")).toBeInTheDocument();
    // description은 고유한 텍스트로 확인
    expect(screen.getByText("두 텍스트의 차이를 시각화합니다")).toBeInTheDocument();
  });

  it("한국어 모드에서 한영/자모 도구 표시", async () => {
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    // getAllByText로 복수 매칭 허용 (ToolCard에 h2 title만 있음)
    expect(screen.getAllByText("한영 변환").length).toBeGreaterThan(0);
    expect(screen.getAllByText("자모 조합").length).toBeGreaterThan(0);
  });

  it("'도구를 선택하세요' 안내 문구 표시", async () => {
    const { default: Home } = await import("@/app/page");
    render(<Home />);
    expect(screen.getByText("도구를 선택하세요")).toBeInTheDocument();
  });
});

describe("CaseConvert 페이지", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("페이지 제목 렌더링", async () => {
    const { default: CaseConvert } = await import("@/app/case-convert/page");
    render(<CaseConvert />);
    // h1 헤딩으로 특정 (본문에 "대소문자 변환"이 여러 번 나올 수 있음)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("대소문자 변환");
  });

  it("입력창 렌더링", async () => {
    const { default: CaseConvert } = await import("@/app/case-convert/page");
    render(<CaseConvert />);
    expect(screen.getByPlaceholderText("텍스트를 입력하세요")).toBeInTheDocument();
  });
});

describe("JamoCompose 페이지", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("페이지 제목 렌더링", async () => {
    const { default: JamoCompose } = await import("@/app/jamo-compose/page");
    render(<JamoCompose />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("자모 조합");
  });

  it("입력창 렌더링", async () => {
    const { default: JamoCompose } = await import("@/app/jamo-compose/page");
    render(<JamoCompose />);
    expect(screen.getByPlaceholderText("자모 입력")).toBeInTheDocument();
  });
});

describe("KorEng 페이지", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("페이지 제목 렌더링", async () => {
    const { default: KorEng } = await import("@/app/kor-eng/page");
    render(<KorEng />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("한영 변환");
  });

  it("입력창 렌더링", async () => {
    const { default: KorEng } = await import("@/app/kor-eng/page");
    render(<KorEng />);
    expect(screen.getByPlaceholderText("영문 입력")).toBeInTheDocument();
  });
});
