import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

// ─── LanguageContext mock ────────────────────────────────────────────────────
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({
    language: "ko" as const,
    setLanguage: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        "textDiff.title": "텍스트 비교",
        "textDiff.labelOriginal": "원본",
        "textDiff.labelModified": "수정본",
        "textDiff.placeholderOriginal": "원본 텍스트를 입력하세요",
        "textDiff.placeholderModified": "수정된 텍스트를 입력하세요",
        "textDiff.resultPlaceholder": "비교 결과가 여기에 표시됩니다",
        "textDiff.resultSame": "두 텍스트가 동일합니다",
        "textDiff.sectionTitle": "사용법",
        "textDiff.sectionDesc": "두 텍스트의 차이를 비교합니다",
        "textDiff.useCasesTitle": "활용 예시",
        "common.copyResult": "결과 복사",
        "common.clear": "초기화",
        "common.toast.cleared": "초기화되었습니다",
        "common.toast.resultCopied": "복사되었습니다",
      };
      return translations[key] ?? key;
    },
  })),
}));

// dictionaries mock
vi.mock("@/locales", () => ({
  dictionaries: {
    ko: {
      textDiff: {
        useCases: ["코드 리뷰", "문서 비교"],
      },
    },
    en: {
      textDiff: {
        useCases: ["Code review", "Document diff"],
      },
    },
  },
  Language: ["ko", "en"],
}));

import TextDiff from "@/app/text-diff/page";

describe("TextDiff 페이지 — 텍스트 비교", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("페이지 제목과 레이블 렌더링", () => {
    render(<TextDiff />);
    expect(screen.getByText("텍스트 비교")).toBeInTheDocument();
    expect(screen.getAllByText("원본").length).toBeGreaterThan(0);
    expect(screen.getAllByText("수정본").length).toBeGreaterThan(0);
  });

  it("두 텍스트가 비어있으면 placeholder 표시", () => {
    render(<TextDiff />);
    expect(screen.getByText("비교 결과가 여기에 표시됩니다")).toBeInTheDocument();
  });

  it("동일한 텍스트 입력 시 '동일합니다' 메시지", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    await userEvent.type(originalTA, "hello");
    await userEvent.type(modifiedTA, "hello");

    await waitFor(() => {
      expect(screen.getByText("두 텍스트가 동일합니다")).toBeInTheDocument();
    });
  });

  it("서로 다른 텍스트 입력 시 diff 결과 표시", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    await userEvent.type(originalTA, "hello");
    await userEvent.type(modifiedTA, "world");

    await waitFor(() => {
      // 비교 결과가 표시되어야 함 (placeholder가 사라져야 함)
      expect(screen.queryByText("비교 결과가 여기에 표시됩니다")).not.toBeInTheDocument();
    });
  });

  it("동일 텍스트 복사 시 '두 텍스트가 동일합니다' 문자열을 clipboard에 복사", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    await userEvent.type(originalTA, "sametext");
    await userEvent.type(modifiedTA, "sametext");

    await waitFor(() => {
      expect(screen.getByText("두 텍스트가 동일합니다")).toBeInTheDocument();
    });

    const copyBtn = screen.getByText("결과 복사");
    await userEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("두 텍스트가 동일합니다");
  });

  it("서로 다른 텍스트 복사 시 +/- prefix 포함 diff 문자열 복사", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    await userEvent.type(originalTA, "abc");
    await userEvent.type(modifiedTA, "axc");

    await waitFor(() => {
      expect(screen.queryByText("비교 결과가 여기에 표시됩니다")).not.toBeInTheDocument();
    });

    const copyBtn = screen.getByText("결과 복사");
    await userEvent.click(copyBtn);

    // diff 결과가 +/-로 prefixed된 문자열로 복사됨
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const copied = vi.mocked(navigator.clipboard.writeText).mock.calls[0][0];
    expect(copied).toContain("-b");
    expect(copied).toContain("+x");
  });

  it("초기화 버튼 클릭 시 양쪽 textarea 모두 초기화", async () => {
    render(<TextDiff />);
    const textareas = screen.getAllByRole("textbox");

    await userEvent.type(textareas[0], "원본 텍스트");
    await userEvent.type(textareas[1], "수정된 텍스트");

    const clearBtn = screen.getByText("초기화");
    await userEvent.click(clearBtn);

    expect(textareas[0]).toHaveValue("");
    expect(textareas[1]).toHaveValue("");
  });

  it("swap 버튼 클릭 시 원본/수정본 교체", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    await userEvent.type(originalTA, "원본");
    await userEvent.type(modifiedTA, "수정본");

    // swap 버튼: data-testid으로 특정 (모바일/데스크탑 분기로 중복 요소 방지)
    const swapBtn = screen.getByTestId("swap-button");
    await userEvent.click(swapBtn);

    await waitFor(() => {
      expect(originalTA).toHaveValue("수정본");
      expect(modifiedTA).toHaveValue("원본");
    });
  });
});
