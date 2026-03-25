import { describe, it, expect } from "vitest";
import { compose, decompose } from "@/utils/hangulCompose";

describe("compose — 자모 → 한글 조합", () => {
  // ── 기본 조합 ──────────────────────────────────────────────────────────────
  it("기본 초성+중성 조합 (종성 없음)", () => {
    expect(compose("ㅎㅏ")).toBe("하");
    expect(compose("ㄴㅏ")).toBe("나");
    expect(compose("ㅅㅏ")).toBe("사");
  });

  it("초성+중성+종성 조합 (받침 있음)", () => {
    expect(compose("ㅎㅏㄴ")).toBe("한");
    expect(compose("ㄱㅡㄹ")).toBe("글");
    expect(compose("ㅁㅏㄹ")).toBe("말");
  });

  it("여러 글자 연속 조합", () => {
    expect(compose("ㅇㅏㄴㄴㅕㅇ")).toBe("안녕");
    expect(compose("ㅎㅏㄴㄱㅡㄹ")).toBe("한글");
    // 감사합니다 = ㄱ+ㅏ+ㅁ / ㅅ+ㅏ / ㅎ+ㅏ+ㅂ / ㄴ+ㅣ / ㄷ+ㅏ (ㅂ not ㅁ!)
    expect(compose("ㄱㅏㅁㅅㅏㅎㅏㅂㄴㅣㄷㅏ")).toBe("감사합니다");
  });

  // ── 복합 초성 (쌍자음) ─────────────────────────────────────────────────────
  it("쌍자음 초성 조합 (ㄱㄱ→ㄲ 등)", () => {
    expect(compose("ㄱㄱㅏ")).toBe("까");
    expect(compose("ㄷㄷㅏ")).toBe("따");
    expect(compose("ㅂㅂㅏ")).toBe("빠");
    expect(compose("ㅅㅅㅏ")).toBe("싸");
    expect(compose("ㅈㅈㅏ")).toBe("짜");
  });

  // ── 복합 중성 (이중모음) ───────────────────────────────────────────────────
  it("이중모음 중성 조합 (ㅗ+ㅏ→ㅘ 등)", () => {
    expect(compose("ㅎㅗㅏ")).toBe("화");
    expect(compose("ㅎㅜㅓ")).toBe("훠");
    expect(compose("ㅎㅡㅣ")).toBe("희");
  });

  // ── 복합 종성 처리 ─────────────────────────────────────────────────────────
  it("복합 종성 조합 후 모음이 오면 분리", () => {
    // 닭 = ㄷ+ㅏ+ㄹ+ㄱ
    expect(compose("ㄷㅏㄹㄱ")).toBe("닭");
  });

  it("복합 종성(ㄺ) + ㅇ+ㅣ → 닭이 (Unicode 조합 기준)", () => {
    // ㄷ+ㅏ+ㄹ+ㄱ: ㄹ+ㄱ=ㄺ 복합종성 → 닭
    // ㅇ+ㅣ: ㅇ은 발음 없는 초성 → 이
    expect(compose("ㄷㅏㄹㄱㅇㅣ")).toBe("닭이");
  });

  it("달기 = ㄷ+ㅏ+ㄹ+ㄱ+ㅣ (ㅇ 없이 직접 조합)", () => {
    // ㄹ+ㄱ 뒤에 모음ㅣ가 바로 오면 ㄱ이 다음 초성으로 이동
    expect(compose("ㄷㅏㄹㄱㅣ")).toBe("달기");
  });

  // ── 공백·숫자·영문 처리 ───────────────────────────────────────────────────
  it("공백 포함 텍스트 조합", () => {
    expect(compose("ㅎㅏㄴ ㄱㅡㄹ")).toBe("한 글");
  });

  it("비한글 문자는 그대로 통과", () => {
    expect(compose("Hello")).toBe("Hello");
    expect(compose("123")).toBe("123");
    expect(compose("ㅎㅏ1")).toBe("하1");
  });

  it("빈 문자열 입력", () => {
    expect(compose("")).toBe("");
  });

  it("자음만 입력 (모음 없음)", () => {
    expect(compose("ㄱ")).toBe("ㄱ");
    expect(compose("ㄱㄴ")).toBe("ㄱㄴ");
  });

  it("모음만 입력 (초성 없음)", () => {
    expect(compose("ㅏ")).toBe("ㅏ");
    expect(compose("ㅗㅏ")).toBe("ㅘ");
  });
});

describe("decompose — 한글 → 자모 분해", () => {
  // ── 기본 분해 ──────────────────────────────────────────────────────────────
  it("종성 없는 글자 분해", () => {
    expect(decompose("하")).toBe("ㅎㅏ");
    expect(decompose("나")).toBe("ㄴㅏ");
  });

  it("종성 있는 글자 분해", () => {
    expect(decompose("한")).toBe("ㅎㅏㄴ");
    expect(decompose("글")).toBe("ㄱㅡㄹ");
    expect(decompose("말")).toBe("ㅁㅏㄹ");
  });

  it("여러 글자 분해", () => {
    expect(decompose("안녕")).toBe("ㅇㅏㄴㄴㅕㅇ");
    expect(decompose("한글")).toBe("ㅎㅏㄴㄱㅡㄹ");
    expect(decompose("감사합니다")).toBe("ㄱㅏㅁㅅㅏㅎㅏㅂㄴㅣㄷㅏ");
  });

  // ── 이중모음 분해 ──────────────────────────────────────────────────────────
  it("이중모음이 포함된 글자 분해 (화→ㅎㅗㅏ)", () => {
    expect(decompose("화")).toBe("ㅎㅗㅏ");
    expect(decompose("희")).toBe("ㅎㅡㅣ");
    expect(decompose("봐")).toBe("ㅂㅗㅏ");
  });

  // ── 비한글 문자 처리 ───────────────────────────────────────────────────────
  it("비한글 문자는 그대로 통과", () => {
    expect(decompose("Hello")).toBe("Hello");
    expect(decompose("123")).toBe("123");
  });

  it("공백 포함 텍스트 분해", () => {
    expect(decompose("한 글")).toBe("ㅎㅏㄴ ㄱㅡㄹ");
  });

  it("빈 문자열", () => {
    expect(decompose("")).toBe("");
  });

  // ── 왕복 검증 (compose ∘ decompose = identity) ─────────────────────────────
  it("분해 후 재조합하면 원문 복원 (단어 단위)", () => {
    const words = ["안녕", "한글", "감사합니다", "대한민국", "서울"];
    for (const word of words) {
      expect(compose(decompose(word))).toBe(word);
    }
  });
});
