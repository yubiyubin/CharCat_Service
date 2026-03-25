import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePersistedState } from "@/hooks/usePersistedState";

describe("usePersistedState", () => {
  it("초기값 반환", () => {
    const { result } = renderHook(() => usePersistedState("test-key", "초기값"));
    expect(result.current[0]).toBe("초기값");
  });

  it("값 업데이트", () => {
    const { result } = renderHook(() => usePersistedState("test-key", ""));

    act(() => {
      result.current[1]("새로운 값");
    });
    expect(result.current[0]).toBe("새로운 값");
  });

  it("sessionStorage에 값 저장", () => {
    const { result } = renderHook(() => usePersistedState("storage-key", ""));

    act(() => {
      result.current[1]("저장될 값");
    });

    expect(sessionStorage.getItem("storage-key")).toBe(JSON.stringify("저장될 값"));
  });

  it("sessionStorage에서 값 복원 (초기 마운트 시)", () => {
    sessionStorage.setItem("restore-key", JSON.stringify("저장된 값"));
    const { result } = renderHook(() => usePersistedState("restore-key", "기본값"));
    expect(result.current[0]).toBe("저장된 값");
  });

  it("clear() 호출 시 초기값으로 상태 리셋", () => {
    const { result } = renderHook(() => usePersistedState("clear-key", "기본"));

    act(() => {
      result.current[1]("변경된 값");
    });
    expect(result.current[0]).toBe("변경된 값");

    act(() => {
      result.current[2](); // clear
    });
    // 상태가 initialValue로 복원됨
    expect(result.current[0]).toBe("기본");
    // useEffect가 initialValue를 다시 sessionStorage에 기록하므로 null이 아님
    // 실제 동작: clear 후에도 sessionStorage에는 초기값이 저장됨
    expect(sessionStorage.getItem("clear-key")).not.toBeNull();
  });

  it("잘못된 JSON이 저장된 경우 초기값 반환", () => {
    sessionStorage.setItem("bad-json-key", "not_valid_json{");
    const { result } = renderHook(() => usePersistedState("bad-json-key", "폴백값"));
    expect(result.current[0]).toBe("폴백값");
  });

  it("숫자 타입 저장/복원", () => {
    const { result } = renderHook(() => usePersistedState("num-key", 0));

    act(() => {
      result.current[1](42);
    });

    const stored = JSON.parse(sessionStorage.getItem("num-key")!);
    expect(stored).toBe(42);
  });

  it("배열 타입 저장/복원", () => {
    sessionStorage.setItem("arr-key", JSON.stringify(["a", "b", "c"]));
    const { result } = renderHook(() => usePersistedState("arr-key", [] as string[]));
    expect(result.current[0]).toEqual(["a", "b", "c"]);
  });
});
