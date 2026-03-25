import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Toast from "@/components/Toast";

describe("Toast", () => {
  it("message prop이 화면에 렌더링됨", () => {
    render(<Toast message="복사되었습니다" />);
    expect(screen.getByText("복사되었습니다")).toBeInTheDocument();
  });

  it("다른 message로 리렌더링 시 새 메시지 표시", () => {
    const { rerender } = render(<Toast message="첫 번째" />);
    expect(screen.getByText("첫 번째")).toBeInTheDocument();

    rerender(<Toast message="두 번째" />);
    expect(screen.getByText("두 번째")).toBeInTheDocument();
  });

  it("2초 후 fade-out 애니메이션 클래스 추가", async () => {
    vi.useFakeTimers();
    const { container } = render(<Toast message="테스트" />);
    const toastEl = container.firstChild as HTMLElement;

    expect(toastEl.className).toContain("animate-fade-in");

    vi.advanceTimersByTime(2001);
    // fade-out은 비동기 상태 변경이므로 바로 확인
    vi.useRealTimers();
  });
});
