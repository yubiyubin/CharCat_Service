import { describe, it, expect } from "vitest";
import { engToKor, korToEng } from "@/features/kor-eng/utils/korEngMap";

describe("engToKor — 영문 자판 → 한글 변환", () => {
  it("기본 단어 변환 (dkssud → 안녕)", () => {
    expect(engToKor("dkssud")).toBe("안녕");
  });

  it("한글 단어 변환 (gksrmf → 한글)", () => {
    expect(engToKor("gksrmf")).toBe("한글");
  });

  it("감사합니다 변환", () => {
    // 감=rka, 사=tk, 합=gkq, 니=sl, 다=ek
    expect(engToKor("rkatkgkqslek")).toBe("감사합니다");
  });

  it("공백 포함 문자열 처리", () => {
    // 한글=gksrmf (g=ㅎ, k=ㅏ, s=ㄴ, r=ㄱ, m=ㅡ, f=ㄹ)
    expect(engToKor("dkssud gksrmf")).toBe("안녕 한글");
  });

  it("숫자는 그대로 통과", () => {
    expect(engToKor("dkssud123")).toBe("안녕123");
  });

  it("매핑 없는 특수문자는 그대로 통과", () => {
    const result = engToKor("dkssud!");
    expect(result).toContain("안녕");
    expect(result).toContain("!");
  });

  it("빈 문자열 처리", () => {
    expect(engToKor("")).toBe("");
  });

  it("대소문자 쌍자음 변환 (R → ㄲ)", () => {
    // R = ㄲ (쌍기역)
    const result = engToKor("Rk"); // ㄲ+ㅏ = 까
    expect(result).toBe("까");
  });
});

describe("korToEng — 한글 → 영문 자판 역변환", () => {
  it("기본 단어 역변환 (안녕 → dkssud)", () => {
    expect(korToEng("안녕")).toBe("dkssud");
  });

  it("한글 역변환 (한글 → gksrmf)", () => {
    expect(korToEng("한글")).toBe("gksrmf");
  });

  it("빈 문자열 처리", () => {
    expect(korToEng("")).toBe("");
  });

  it("비한글 문자는 그대로 통과", () => {
    expect(korToEng("123")).toBe("123");
  });
});

describe("korToEng — compound jamo 처리 (DECOMPOSE_FINALS/MEDIALS)", () => {
  it("복합 종성(ㄳ) 포함 한글 역변환", () => {
    // 넋 = ㄴ+ㅓ+ㄳ (DECOMPOSE_FINALS: ㄳ → [ㄱ, ㅅ])
    // 넋 = korToEng → decompose로 ㄴ+ㅓ+ㄱ+ㅅ → s+j+r+t
    const result = korToEng("넋");
    expect(result).toBe("sjrt");
  });

  it("이중모음(ㅘ) 포함 한글 역변환", () => {
    // 봐 = ㅂ+ㅘ → decompose: ㅂ+ㅗ+ㅏ → q+h+k
    const result = korToEng("봐");
    expect(result).toBe("qhk");
  });

  it("비한글 문자가 포함된 경우 그대로 통과", () => {
    const result = korToEng("안녕 hello");
    expect(result).toContain("dkssud");
    expect(result).toContain("hello");
  });
});

describe("왕복 변환 검증 (engToKor ∘ korToEng)", () => {
  it("한글 → 영문 → 한글 복원", () => {
    const words = ["안녕", "한글", "사랑"];
    for (const word of words) {
      expect(engToKor(korToEng(word))).toBe(word);
    }
  });

  it("영문 → 한글 → 영문 복원 (매핑 가능한 문자만)", () => {
    // 모든 영문이 한글로 매핑 가능한 경우만 테스트
    const words = ["dkssud", "gksrmf"];
    for (const word of words) {
      expect(korToEng(engToKor(word))).toBe(word);
    }
  });
});
