import { describe, it, expect, vi } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import React from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

// ─── 테스트용 컨슈머 컴포넌트 ─────────────────────────────────────────────────
function LanguageConsumer() {
  const { language, t, setLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="translation">{t("header.charCount")}</span>
      <button onClick={() => setLanguage("en")} data-testid="set-en">
        English
      </button>
      <button onClick={() => setLanguage("ko")} data-testid="set-ko">
        Korean
      </button>
    </div>
  );
}

describe("LanguageProvider", () => {
  it("마운트 후 기본 언어는 ko (localStorage에 저장값 없을 때)", async () => {
    // ko로 시작하는 navigator.language 설정
    Object.defineProperty(window.navigator, "language", {
      value: "ko-KR",
      configurable: true,
    });

    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("language")).toBeInTheDocument();
    });

    expect(screen.getByTestId("language").textContent).toBe("ko");
  });

  it("localStorage에 'en'이 저장된 경우 en으로 설정", async () => {
    localStorage.setItem("language", "en");

    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("language").textContent).toBe("en");
    });
  });

  it("localStorage에 'ko'가 저장된 경우 ko로 설정", async () => {
    localStorage.setItem("language", "ko");

    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("language").textContent).toBe("ko");
    });
  });

  it("setLanguage 호출 시 언어 변경 + localStorage 업데이트", async () => {
    localStorage.setItem("language", "ko");

    const { getByTestId } = render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(getByTestId("language").textContent).toBe("ko");
    });

    act(() => {
      getByTestId("set-en").click();
    });

    await waitFor(() => {
      expect(getByTestId("language").textContent).toBe("en");
    });
    expect(localStorage.getItem("language")).toBe("en");
  });

  it("t() 함수가 올바른 번역 반환", async () => {
    localStorage.setItem("language", "ko");

    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>
    );

    await waitFor(() => {
      const translation = screen.getByTestId("translation").textContent;
      expect(translation).toBeTruthy();
      expect(translation).not.toBe("header.charCount"); // key가 그대로 반환되지 않아야 함
    });
  });

  it("useLanguage를 Provider 밖에서 사용하면 에러 발생", () => {
    // console.error 억제
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<LanguageConsumer />);
    }).toThrow("useLanguage must be used within a LanguageProvider");

    consoleSpy.mockRestore();
  });
});
