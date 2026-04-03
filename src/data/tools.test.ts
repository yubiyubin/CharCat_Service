import { describe, it, expect } from "vitest";
import { TOOLS, getToolByHref } from "./tools";

describe("TOOLS", () => {
  it("모든 도구에 href, icon, labelKey가 있어야 함", () => {
    for (const tool of TOOLS) {
      expect(tool.href).toBeTruthy();
      expect(tool.icon).toBeTruthy();
      expect(tool.labelKey).toBeTruthy();
    }
  });

  it("href는 /로 시작해야 함", () => {
    for (const tool of TOOLS) {
      expect(tool.href.startsWith("/")).toBe(true);
    }
  });

  it("중복 href 없어야 함", () => {
    const hrefs = TOOLS.map((t) => t.href);
    const unique = new Set(hrefs);
    expect(unique.size).toBe(hrefs.length);
  });
});

describe("getToolByHref", () => {
  it("존재하는 href로 도구 반환", () => {
    const tool = getToolByHref("/char-count");
    expect(tool).toBeDefined();
    expect(tool?.href).toBe("/char-count");
  });

  it("존재하지 않는 href는 undefined 반환", () => {
    const tool = getToolByHref("/nonexistent");
    expect(tool).toBeUndefined();
  });

  it("TOOLS의 모든 href에 대해 도구를 반환해야 함", () => {
    for (const { href } of TOOLS) {
      expect(getToolByHref(href)).toBeDefined();
    }
  });
});
