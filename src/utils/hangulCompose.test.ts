import { describe, expect, test } from "vitest";
import { decompose, compose } from "./hangulCompose";

describe("decompose", () => {
  test.each([
    // 기본 한글 분해
    ["가", "ㄱㅏ"],
    ["나", "ㄴㅏ"],
    ["힣", "ㅎㅣㅎ"],      // 마지막 한글: 받침 ㅎ 포함
    // 받침 있는 글자
    ["한", "ㅎㅏㄴ"],
    ["글", "ㄱㅡㄹ"],
    ["닭", "ㄷㅏㄺ"],     // 겹받침 ㄺ은 하나의 유니코드로 유지
    // 복합 모음 분해
    ["봐", "ㅂㅗㅏ"],      // ㅘ → ㅗㅏ
    ["귀", "ㄱㅜㅣ"],      // ㅟ → ㅜㅣ
    // 영문·숫자·공백은 그대로
    ["hello", "hello"],
    ["123", "123"],
    ["한 글", "ㅎㅏㄴ ㄱㅡㄹ"],
    ["", ""],
  ])('decompose("%s") → "%s"', (input, expected) => {
    expect(decompose(input)).toBe(expected);
  });
});

describe("compose", () => {
  test.each([
    // 기본 조합
    ["ㄱㅏ", "가"],
    ["ㄴㅏ", "나"],
    // 받침 조합
    ["ㅎㅏㄴ", "한"],
    ["ㄱㅡㄹ", "글"],
    // 복합 모음 조합
    ["ㅂㅗㅏ", "봐"],     // ㅗ+ㅏ → ㅘ
    ["ㄱㅜㅣ", "귀"],     // ㅜ+ㅣ → ㅟ
    // 쌍자음 초성
    ["ㄱㄱㅏ", "까"],     // ㄱ+ㄱ → ㄲ 초성
    // 공백·영문 혼합
    ["ㅎㅏㄴ ㄱㅡㄹ", "한 글"],
    ["", ""],
  ])('compose("%s") → "%s"', (input, expected) => {
    expect(compose(input)).toBe(expected);
  });

  test("decompose → compose 왕복 일치", () => {
    const words = ["한글", "안녕하세요", "대한민국", "봐요", "귀여워"];
    for (const word of words) {
      expect(compose(decompose(word))).toBe(word);
    }
  });
});
