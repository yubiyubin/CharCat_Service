import { describe, expect, test } from "vitest";
import { tokenize, computeTextDiff } from "./textDiff";

describe("tokenize", () => {
  test.each([
    ["hello world", ["hello", " ", "world"]],
    ["  leading", ["  ", "leading"]],
    ["a  b", ["a", "  ", "b"]],
    ["single", ["single"]],
    ["", []],
  ])('tokenize("%s")', (input, expected) => {
    expect(tokenize(input)).toEqual(expected);
  });
});

describe("computeTextDiff", () => {
  test("둘 다 빈 문자열이면 hasDiff=false", () => {
    expect(computeTextDiff("", "").hasDiff).toBe(false);
  });

  test("동일한 텍스트면 hasDiff=false", () => {
    expect(computeTextDiff("hello", "hello").hasDiff).toBe(false);
  });

  test("단어 하나가 바뀌면 changed 줄에 정확한 세그먼트 반환", () => {
    const { hasDiff, lines } = computeTextDiff("hello world", "hello earth");
    expect(hasDiff).toBe(true);
    expect(lines).toHaveLength(1);

    const line = lines[0];
    expect(line.kind).toBe("changed");
    if (line.kind !== "changed") return;

    const removed = line.segments.find((s) => s.type === "removed");
    const added = line.segments.find((s) => s.type === "added");
    expect(removed?.tokens.join("")).toBe("world");
    expect(added?.tokens.join("")).toBe("earth");
  });

  test("여러 단어가 바뀌면 각 쌍이 개별 세그먼트로 반환", () => {
    // "my" → "My", "is" → "id", "YUbin" → "Yunin"
    const { lines } = computeTextDiff(
      "hello my name is YUbin",
      "hello My name id Yunin",
    );
    expect(lines).toHaveLength(1);
    const line = lines[0];
    expect(line.kind).toBe("changed");
    if (line.kind !== "changed") return;

    const removedTokens = line.segments
      .filter((s) => s.type === "removed")
      .map((s) => s.tokens.join(""));
    const addedTokens = line.segments
      .filter((s) => s.type === "added")
      .map((s) => s.tokens.join(""));

    expect(removedTokens).toEqual(["my", "is", "YUbin"]);
    expect(addedTokens).toEqual(["My", "id", "Yunin"]);
  });

  test("줄이 삭제되면 removed 줄로 반환", () => {
    const { lines } = computeTextDiff("line1\nline2", "line1");
    const removedLine = lines.find((l) => l.kind === "removed");
    expect(removedLine).toBeDefined();
    if (removedLine?.kind === "removed") {
      expect(removedLine.text).toBe("line2");
    }
  });

  test("줄이 추가되면 added 줄로 반환", () => {
    const { lines } = computeTextDiff("line1", "line1\nnew line");
    const addedLine = lines.find((l) => l.kind === "added");
    expect(addedLine).toBeDefined();
    if (addedLine?.kind === "added") {
      expect(addedLine.text).toBe("new line");
    }
  });

  test("원본 2줄 → 수정 1줄: 1번째 줄은 changed, 2번째 줄은 removed", () => {
    // 실제 버그 재현 케이스
    const { lines } = computeTextDiff(
      "hello my name is YUbin\nnice",
      "hello My name id Yunin",
    );
    expect(lines[0].kind).toBe("changed");
    expect(lines[1].kind).toBe("removed");
    if (lines[1].kind === "removed") {
      expect(lines[1].text).toBe("nice");
    }
    // "nice"가 "Yunin"과 쌍이 되지 않아야 함
    const changed = lines[0];
    if (changed.kind === "changed") {
      const addedTexts = changed.segments
        .filter((s) => s.type === "added")
        .map((s) => s.tokens.join(""));
      expect(addedTexts).not.toContain("Yunin\nnice");
    }
  });

  test("unchanged 줄은 그대로 반환", () => {
    const { lines } = computeTextDiff("same\nchanged", "same\nmodified");
    expect(lines[0].kind).toBe("unchanged");
    if (lines[0].kind === "unchanged") {
      expect(lines[0].text).toBe("same");
    }
  });
});
