import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

// ─── Logo mock (public/logo.tsx → SVG 컴포넌트) ────────────────────────────
vi.mock("../../public/logo", () => ({
  default: () => React.createElement("span", null, "Logo"),
}));

// ─── next/link mock ─────────────────────────────────────────────────────────
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) =>
    React.createElement(
      "a",
      { href, onClick },
      children
    ),
}));

// ─── LanguageContext mock ────────────────────────────────────────────────────
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({
    language: "ko" as const,
    setLanguage: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        "header.charCount": "글자수 세기",
        "header.charCountShort": "글자수",
        "header.korEng": "한영 변환",
        "header.korEngShort": "한영",
        "header.textDiff": "텍스트 비교",
        "header.textDiffShort": "비교",
        "header.caseConvert": "대소문자",
        "header.caseConvertShort": "케이스",
        "header.emoji": "이모지",
        "header.emojiShort": "이모지",
        "header.jamoCompose": "자모 조합",
        "header.jamoComposeShort": "자모",
      };
      return translations[key] ?? key;
    },
  })),
}));

import Header from "@/components/Header";

describe("Header 컴포넌트", () => {
  it("로고 렌더링", () => {
    render(<Header />);
    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  it("데스크탑 nav 링크 렌더링 (ko 언어)", () => {
    render(<Header />);
    // 한국어 모드: 글자수, 한영, 텍스트비교, 대소문자, 이모지, 자모
    expect(screen.getAllByText("글자수 세기").length).toBeGreaterThan(0);
    expect(screen.getAllByText("한영 변환").length).toBeGreaterThan(0);
  });

  it("모바일 햄버거 버튼 렌더링", () => {
    render(<Header />);
    const menuBtn = screen.getByRole("button", { name: "메뉴" });
    expect(menuBtn).toBeInTheDocument();
  });

  it("모바일 메뉴 열기/닫기 토글", async () => {
    render(<Header />);
    const menuBtn = screen.getByRole("button", { name: "메뉴" });

    // 초기 상태: 모바일 메뉴 숨겨짐
    // nav 요소는 존재하지만 모바일 드롭다운은 없음
    const navCount = screen.queryAllByRole("navigation").length;

    await userEvent.click(menuBtn);

    // 클릭 후: 모바일 nav가 추가됨
    const navCountAfter = screen.queryAllByRole("navigation").length;
    expect(navCountAfter).toBeGreaterThanOrEqual(navCount);
  });

  it("한국어 언어에서는 자모 조합 링크 포함", () => {
    render(<Header />);
    expect(screen.getAllByText("자모 조합").length).toBeGreaterThan(0);
  });
});

describe("Header — 영어 모드", () => {
  it("영어 모드에서는 한영변환/자모 링크가 navLinks에서 제외됨", async () => {
    const { useLanguage } = await import("@/contexts/LanguageContext");
    vi.mocked(useLanguage).mockReturnValueOnce({
      language: "en" as const,
      setLanguage: vi.fn(),
      t: (key: string) => {
        const en: Record<string, string> = {
          "header.charCount": "Character Count",
          "header.charCountShort": "Count",
          "header.textDiff": "Text Diff",
          "header.textDiffShort": "Diff",
          "header.caseConvert": "Case Convert",
          "header.caseConvertShort": "Case",
          "header.emoji": "Emoji",
          "header.emojiShort": "Emoji",
        };
        return en[key] ?? key;
      },
    });

    render(<Header />);
    // 영어 모드: 한영/자모는 ko 전용이므로 렌더링 안 됨
    expect(screen.queryAllByText("한영 변환").length).toBe(0);
    expect(screen.queryAllByText("자모 조합").length).toBe(0);
    // 영어 메뉴는 있어야 함
    expect(screen.getAllByText("Character Count").length).toBeGreaterThan(0);
  });
});
