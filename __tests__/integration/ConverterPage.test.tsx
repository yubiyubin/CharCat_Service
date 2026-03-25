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
        "common.resultPlaceholder": "결과가 여기에 표시됩니다",
        "common.copyResult": "결과 복사",
        "common.clear": "초기화",
        "common.toast.resultCopied": "복사되었습니다",
        "common.toast.cleared": "초기화되었습니다",
      };
      return translations[key] ?? key;
    },
  })),
}));

import ConverterPage from "@/components/ConverterPage";

const mockProps = {
  converters: [
    (text: string) => text.toUpperCase(),
    (text: string) => text.toLowerCase(),
  ] as [(text: string) => string, (text: string) => string],
  labels: {
    forward: ["소문자", "대문자"] as [string, string],
    reverse: ["대문자", "소문자"] as [string, string],
  },
  placeholders: ["소문자를 입력하세요", "대문자를 입력하세요"] as [string, string],
  title: "대소문자 변환",
  about: { title: "사용법", description: "대소문자를 변환합니다." },
  examples: {
    title: "예시",
    // 테스트 입력값(uniquetext)과 겹치지 않는 예제 사용
    items: [{ from: "sample", to: "SAMPLE" }],
  },
  pageKey: "test-converter",
};

describe("ConverterPage 컴포넌트", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("제목, 레이블, placeholder 렌더링", () => {
    render(<ConverterPage {...mockProps} />);
    expect(screen.getByText("대소문자 변환")).toBeInTheDocument();
    expect(screen.getByText("소문자")).toBeInTheDocument();
    expect(screen.getByText("대문자")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("소문자를 입력하세요")).toBeInTheDocument();
  });

  it("입력 텍스트가 실시간으로 변환 결과에 반영", async () => {
    render(<ConverterPage {...mockProps} />);
    const textarea = screen.getByPlaceholderText("소문자를 입력하세요");
    // uniquetext: 예제(sample/SAMPLE)와 겹치지 않음
    await userEvent.type(textarea, "uniquetext");

    await waitFor(() => {
      expect(screen.getByText("UNIQUETEXT")).toBeInTheDocument();
    });
  });

  it("방향 전환 버튼 클릭 시 레이블 토글", async () => {
    render(<ConverterPage {...mockProps} />);
    expect(screen.getByText("소문자")).toBeInTheDocument();

    const swapBtn = screen.getByRole("button", { name: "" });
    await userEvent.click(swapBtn);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("대문자를 입력하세요")).toBeInTheDocument();
    });
  });

  it("방향 전환 후 역함수(toLowerCase) 적용", async () => {
    render(<ConverterPage {...mockProps} />);

    const swapBtn = screen.getByRole("button", { name: "" });
    await userEvent.click(swapBtn);

    const textarea = screen.getByPlaceholderText("대문자를 입력하세요");
    await userEvent.type(textarea, "UNIQUETEXT");

    await waitFor(
      () => {
        expect(screen.getByText("uniquetext")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("초기화 버튼 클릭 시 입력 초기화", async () => {
    render(<ConverterPage {...mockProps} />);
    const textarea = screen.getByPlaceholderText("소문자를 입력하세요");
    await userEvent.type(textarea, "clearme");

    await userEvent.click(screen.getByText("초기화"));
    expect(textarea).toHaveValue("");
  });

  it("결과 복사 버튼 클릭 시 clipboard에 변환 결과 복사", async () => {
    render(<ConverterPage {...mockProps} />);
    const textarea = screen.getByPlaceholderText("소문자를 입력하세요");
    await userEvent.type(textarea, "copytest");

    await userEvent.click(screen.getByText("결과 복사"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("COPYTEST");
  });

  it("examples 섹션 렌더링", () => {
    render(<ConverterPage {...mockProps} />);
    expect(screen.getByText("예시")).toBeInTheDocument();
    expect(screen.getByText("sample")).toBeInTheDocument();
    expect(screen.getByText("SAMPLE")).toBeInTheDocument();
  });

  it("about 섹션 렌더링", () => {
    render(<ConverterPage {...mockProps} />);
    expect(screen.getByText("사용법")).toBeInTheDocument();
    expect(screen.getByText("대소문자를 변환합니다.")).toBeInTheDocument();
  });

  it("title이 배열인 경우 방향에 따라 다른 제목", async () => {
    const arrayTitleProps = {
      ...mockProps,
      title: ["정방향 제목", "역방향 제목"] as [string, string],
    };
    render(<ConverterPage {...arrayTitleProps} />);
    expect(screen.getByText("정방향 제목")).toBeInTheDocument();

    const swapBtn = screen.getByRole("button", { name: "" });
    await userEvent.click(swapBtn);

    await waitFor(() => {
      expect(screen.getByText("역방향 제목")).toBeInTheDocument();
    });
  });
});
