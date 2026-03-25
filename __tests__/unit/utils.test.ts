import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn — className 병합 유틸리티", () => {
  it("단순 클래스 병합", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("undefined/null 입력 무시", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("Tailwind 충돌 클래스 해결 (tailwind-merge)", () => {
    // tailwind-merge는 충돌하는 utility를 마지막 것으로 해결
    expect(cn("p-4", "p-6")).toBe("p-6");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("조건부 클래스 (clsx boolean)", () => {
    expect(cn("foo", false && "bar", true && "baz")).toBe("foo baz");
  });

  it("조건부 클래스 (clsx object)", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("빈 입력 처리", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
  });
});
