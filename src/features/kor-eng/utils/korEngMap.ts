import { compose, decompose, DECOMPOSE_FINALS, DECOMPOSE_MEDIALS } from "@/utils/hangulCompose";

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

/** 복합 자모를 구성 자모 배열로 분해하는 통합 맵 (hangulCompose의 데이터를 재사용) */
const compoundToComponents: Record<string, string[]> = {};
for (const [compound, parts] of Object.entries(DECOMPOSE_FINALS)) {
  compoundToComponents[compound] = parts;
}
for (const [compound, parts] of Object.entries(DECOMPOSE_MEDIALS)) {
  compoundToComponents[compound] = parts;
}

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
      if (korToEngMap[char]) return [korToEngMap[char]];

      if (compoundToComponents[char]) {
        return compoundToComponents[char].map((c) => korToEngMap[c] ?? c);
      }
      return [char];
    })
    .join("");
}
