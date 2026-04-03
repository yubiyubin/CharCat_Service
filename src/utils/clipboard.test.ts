import { describe, it, expect, vi, beforeEach } from "vitest";
import { copyToClipboard } from "./clipboard";

describe("copyToClipboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("성공 시 true 반환", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    const result = await copyToClipboard("hello");
    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("실패 시 false 반환 (클립보드 권한 거부)", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockRejectedValue(new Error("Permission denied")) },
      configurable: true,
    });
    const result = await copyToClipboard("hello");
    expect(result).toBe(false);
  });

  it("빈 문자열도 정상 처리", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    const result = await copyToClipboard("");
    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });
});
