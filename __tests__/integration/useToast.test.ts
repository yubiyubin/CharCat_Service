import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToast } from "@/hooks/useToast";

describe("useToast", () => {
  it("초기 상태는 빈 문자열", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toast).toBe("");
  });

  it("showToast 호출 시 메시지 표시", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.showToast("복사되었습니다");
    });
    expect(result.current.toast).toBe("복사되었습니다");
  });

  it("2초 후 자동으로 toast가 사라짐", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast("잠깐 보여주세요");
    });
    expect(result.current.toast).toBe("잠깐 보여주세요");

    await act(async () => {
      vi.advanceTimersByTime(2001);
    });
    expect(result.current.toast).toBe("");

    vi.useRealTimers();
  });

  it("새 메시지로 이전 메시지 교체", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast("첫 번째 메시지");
    });
    expect(result.current.toast).toBe("첫 번째 메시지");

    act(() => {
      result.current.showToast("두 번째 메시지");
    });
    expect(result.current.toast).toBe("두 번째 메시지");
  });
});
