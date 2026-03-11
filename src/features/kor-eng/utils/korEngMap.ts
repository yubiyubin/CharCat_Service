import { compose, decompose } from "@/utils/hangulCompose";

const engToKorMap: Record<string, string> = {
  q: "ㅂ",
  w: "ㅈ",
  e: "ㄷ",
  r: "ㄱ",
  t: "ㅅ",
  y: "ㅛ",
  u: "ㅕ",
  i: "ㅑ",
  o: "ㅐ",
  p: "ㅔ",
  a: "ㅁ",
  s: "ㄴ",
  d: "ㅇ",
  f: "ㄹ",
  g: "ㅎ",
  h: "ㅗ",
  j: "ㅓ",
  k: "ㅏ",
  l: "ㅣ",
  z: "ㅋ",
  x: "ㅌ",
  c: "ㅊ",
  v: "ㅍ",
  b: "ㅠ",
  n: "ㅜ",
  m: "ㅡ",
  Q: "ㅃ",
  W: "ㅉ",
  E: "ㄸ",
  R: "ㄲ",
  T: "ㅆ",
  O: "ㅒ",
  P: "ㅖ",
};

const korToEngMap: Record<string, string> = {};
Object.entries(engToKorMap).forEach(([eng, kor]) => {
  korToEngMap[kor] = eng;
});

// ✅ 변경: compose 적용
export function engToKor(text: string): string {
  const jamos = text
    .split("")
    .map((char) => engToKorMap[char] ?? char)
    .join("");
  return compose(jamos);
}

export function korToEng(text: string): string {
  return decompose(text)
    .split("")
    .flatMap((char) => {
      // If mapped directly (includes ㄲ->R, ㄸ->E, etc., and individual jamos)
      if (korToEngMap[char]) return [korToEngMap[char]];

      // If it's a compound final like ㄳ, ㄶ, etc., that is NOT in the map directly
      // we should decompose it further into keys
      if (char.length === 1) {
        // This is a bit hacky but we need the decompose table
        const compoundMap: Record<string, string[]> = {
          ㄳ: ["ㄱ", "ㅅ"],
          ㄵ: ["ㄴ", "ㅈ"],
          ㄶ: ["ㄴ", "ㅎ"],
          ㄺ: ["ㄹ", "ㄱ"],
          ㄻ: ["ㄹ", "ㅁ"],
          ㄼ: ["ㄹ", "ㅂ"],
          ㄽ: ["ㄹ", "ㅅ"],
          ㄾ: ["ㄹ", "ㅌ"],
          ㄿ: ["ㄹ", "ㅍ"],
          ㅀ: ["ㄹ", "ㅎ"],
          ㅄ: ["ㅂ", "ㅅ"],
          ㅘ: ["ㅗ", "ㅏ"],
          ㅙ: ["ㅗ", "ㅐ"],
          ㅚ: ["ㅗ", "ㅣ"],
          ㅝ: ["ㅜ", "ㅓ"],
          ㅞ: ["ㅜ", "ㅔ"],
          ㅟ: ["ㅜ", "ㅣ"],
          ㅢ: ["ㅡ", "ㅣ"],
        };
        if (compoundMap[char]) {
          return compoundMap[char].map((c) => korToEngMap[c] ?? c);
        }
      }
      return [char];
    })
    .join("");
}
