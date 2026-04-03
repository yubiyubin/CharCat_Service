import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, test, expect, beforeEach } from "vitest";
import TextDiff from "./page";

// LanguageContext와 sessionStorage 의존성 모킹
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: () => ({
    language: "ko",
    t: (key: string) => key, // 키 그대로 반환
  }),
}));

vi.mock("@/locales", () => ({
  dictionaries: {
    ko: { textDiff: { useCases: [] } },
    en: { textDiff: { useCases: [] } },
  },
}));

// sessionStorage는 jsdom에서 기본 제공되나 테스트 간 초기화
beforeEach(() => {
  sessionStorage.clear();
  vi.clearAllMocks();
});

describe("TextDiff 컴포넌트", () => {
  test("초기 렌더링: 텍스트에어리어 2개 + 결과 placeholder 표시", () => {
    render(<TextDiff />);
    const textareas = screen.getAllByRole("textbox");
    expect(textareas).toHaveLength(2);
    expect(screen.getByText("textDiff.resultPlaceholder")).toBeInTheDocument();
  });

  test("동일한 텍스트 입력 시 '같음' 메시지 표시", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    fireEvent.change(originalTA, { target: { value: "hello world" } });
    fireEvent.change(modifiedTA, { target: { value: "hello world" } });

    await waitFor(() => {
      expect(screen.getByText("textDiff.resultSame")).toBeInTheDocument();
    });
  });

  test("텍스트가 다를 때 결과 영역에 diff 렌더링 (placeholder 사라짐)", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    fireEvent.change(originalTA, { target: { value: "hello world" } });
    fireEvent.change(modifiedTA, { target: { value: "hello earth" } });

    await waitFor(() => {
      expect(screen.queryByText("textDiff.resultPlaceholder")).not.toBeInTheDocument();
    });
  });

  test("변경된 단어가 결과에 표시됨", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    fireEvent.change(originalTA, { target: { value: "hello world" } });
    fireEvent.change(modifiedTA, { target: { value: "hello earth" } });

    await waitFor(() => {
      expect(screen.getByText("world")).toBeInTheDocument();
      expect(screen.getByText("earth")).toBeInTheDocument();
    });
  });

  test("초기화 버튼 클릭 시 결과 영역이 placeholder로 돌아옴", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox");

    fireEvent.change(originalTA, { target: { value: "hello" } });
    fireEvent.change(modifiedTA, { target: { value: "world" } });

    const clearBtn = screen.getByText("common.clear");
    fireEvent.click(clearBtn);

    await waitFor(() => {
      expect(screen.getByText("textDiff.resultPlaceholder")).toBeInTheDocument();
    });
  });

  test("⇄ 버튼 클릭 시 원본/수정 텍스트가 교환됨", async () => {
    render(<TextDiff />);
    const [originalTA, modifiedTA] = screen.getAllByRole("textbox") as HTMLTextAreaElement[];

    fireEvent.change(originalTA, { target: { value: "AAA" } });
    fireEvent.change(modifiedTA, { target: { value: "BBB" } });

    // swap 버튼은 텍스트 없는 icon 버튼 — getAllByRole로 첫 번째(swap)를 선택
    const [swapBtn] = screen.getAllByRole("button");
    fireEvent.click(swapBtn);

    await waitFor(() => {
      expect(originalTA.value).toBe("BBB");
      expect(modifiedTA.value).toBe("AAA");
    });
  });
});
