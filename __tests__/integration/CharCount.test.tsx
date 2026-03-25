import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

// ─── LanguageContext mock ────────────────────────────────────────────────────
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({
    language: "ko" as const,
    setLanguage: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        "charCount.title": "글자수 세기",
        "charCount.placeholder": "텍스트를 입력하세요",
        "charCount.stats.withSpaces": "공백 포함",
        "charCount.stats.withoutSpaces": "공백 제외",
        "charCount.stats.words": "단어",
        "charCount.stats.sentences": "문장",
        "charCount.stats.lines": "줄",
        "charCount.stats.bytes": "바이트",
        "charCount.actions.copy": "복사",
        "charCount.actions.clear": "초기화",
        "charCount.actions.removeSpaces": "공백 제거",
        "charCount.actions.removeLineBreaks": "줄바꿈 제거",
        "charCount.toast.copied": "복사되었습니다",
        "charCount.toast.cleared": "초기화되었습니다",
        "charCount.toast.spacesRemoved": "공백이 제거되었습니다",
        "charCount.toast.lineBreaksRemoved": "줄바꿈이 제거되었습니다",
        "charCount.section1Title": "플랫폼별 글자수 제한",
        "charCount.section2Title": "바이트 계산 방식",
        "charCount.section2Desc": "한글은 UTF-8 기준 3바이트",
      };
      return translations[key] ?? key;
    },
  })),
}));

vi.mock("@/locales", () => ({
  dictionaries: {
    ko: {
      charCount: {
        section1Items: [
          { label: "트위터", limit: "280자" },
          { label: "인스타그램", limit: "2,200자" },
        ],
        byteExamples: [
          { label: "영문 1자", bytes: "1 byte" },
          { label: "한글 1자", bytes: "3 bytes" },
        ],
      },
    },
    en: {
      charCount: { section1Items: [], byteExamples: [] },
    },
  },
  Language: ["ko", "en"],
}));

import CharCount from "@/app/char-count/page";

/** 특정 stat card ID 안에서 숫자를 찾는 헬퍼 */
function getStatValue(id: string): string {
  const container = document.getElementById(id);
  if (!container) throw new Error(`Stat card not found: ${id}`);
  return within(container).getByRole("paragraph", { hidden: true }).textContent ?? "";
}

/** 특정 stat card의 <p> 태그에서 숫자값을 읽음 */
function queryStatValue(id: string): number {
  const container = document.getElementById(id);
  if (!container) return -1;
  const p = container.querySelector("p");
  return p ? Number(p.textContent) : -1;
}

describe("CharCount 페이지 — 글자수 통계 계산", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("페이지 제목 렌더링", () => {
    render(<CharCount />);
    expect(screen.getByText("글자수 세기")).toBeInTheDocument();
  });

  it("빈 텍스트 초기 상태 — 주요 통계값이 0", () => {
    render(<CharCount />);
    expect(queryStatValue("char-with-spaces")).toBe(0);
    expect(queryStatValue("word-count")).toBe(0);
    expect(queryStatValue("byte-count")).toBe(0);
  });

  it("텍스트 입력 시 글자수(공백 포함) 실시간 업데이트", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "hello");
    expect(queryStatValue("char-with-spaces")).toBe(5);
  });

  it("공백 포함/제외 글자수 차이 검증", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "hello world");
    expect(queryStatValue("char-with-spaces")).toBe(11);
    expect(queryStatValue("char-without-spaces")).toBe(10);
  });

  it("단어수 계산", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "hello world foo");
    expect(queryStatValue("word-count")).toBe(3);
  });

  it("한글 바이트 계산 (한 글자 = 3 bytes)", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "안");
    expect(queryStatValue("byte-count")).toBe(3);
  });

  it("초기화 버튼 클릭 시 텍스트 삭제", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "some text");
    await userEvent.click(screen.getByText("초기화"));
    expect(textarea).toHaveValue("");
    expect(queryStatValue("char-with-spaces")).toBe(0);
  });

  it("공백 제거 버튼 클릭 시 공백 삭제", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "hello world");
    await userEvent.click(screen.getByText("공백 제거"));
    expect(textarea).toHaveValue("helloworld");
    expect(queryStatValue("char-with-spaces")).toBe(10);
  });

  it("줄바꿈 제거 버튼 클릭 시 \\n이 공백으로 변환", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.clear(textarea);
    await userEvent.type(textarea, "line1{enter}line2");
    await userEvent.click(screen.getByText("줄바꿈 제거"));
    expect(textarea).toHaveValue("line1 line2");
  });

  it("복사 버튼 클릭 시 clipboard.writeText 호출", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "copy me");
    await userEvent.click(screen.getByText("복사"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("copy me");
  });
});

describe("CharCount — 통계 계산 엣지케이스", () => {
  it("공백만 있는 텍스트 — 단어수 0, 공백포함 글자수는 존재", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "   ");
    expect(queryStatValue("word-count")).toBe(0);
    expect(queryStatValue("char-with-spaces")).toBe(3);
    expect(queryStatValue("char-without-spaces")).toBe(0);
  });

  it("여러 줄 텍스트 — 줄수 계산", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    await userEvent.type(textarea, "line1{enter}line2{enter}line3");
    expect(queryStatValue("line-count")).toBe(3);
  });

  it("한글 + 영문 혼합 바이트 계산", async () => {
    render(<CharCount />);
    const textarea = screen.getByPlaceholderText("텍스트를 입력하세요");
    // "안a" = 3 + 1 = 4 bytes
    await userEvent.type(textarea, "안a");
    expect(queryStatValue("byte-count")).toBe(4);
  });
});
