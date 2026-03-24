const INITIALS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const MEDIALS = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const FINALS = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const COMPOUND_INITIALS: Record<string, string> = {
  ㄱㄱ: "ㄲ",
  ㄷㄷ: "ㄸ",
  ㅂㅂ: "ㅃ",
  ㅅㅅ: "ㅆ",
  ㅈㅈ: "ㅉ",
};

const COMPOUND_MEDIALS: Record<string, string> = {
  ㅗㅏ: "ㅘ",
  ㅗㅐ: "ㅙ",
  ㅗㅣ: "ㅚ",
  ㅜㅓ: "ㅝ",
  ㅜㅔ: "ㅞ",
  ㅜㅣ: "ㅟ",
  ㅡㅣ: "ㅢ",
};

const COMPOUND_FINALS: Record<string, string> = {
  ㄱㅅ: "ㄳ",
  ㄴㅈ: "ㄵ",
  ㄴㅎ: "ㄶ",
  ㄹㄱ: "ㄺ",
  ㄹㅁ: "ㄻ",
  ㄹㅂ: "ㄼ",
  ㄹㅅ: "ㄽ",
  ㄹㅌ: "ㄾ",
  ㄹㅍ: "ㄿ",
  ㄹㅎ: "ㅀ",
  ㅂㅅ: "ㅄ",
  ㄱㄱ: "ㄲ",
  ㅅㅅ: "ㅆ",
};

export const DECOMPOSE_FINALS: Record<string, [string, string]> = {
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
  ㄲ: ["ㄱ", "ㄱ"],
  ㅆ: ["ㅅ", "ㅅ"],
};

export const DECOMPOSE_MEDIALS: Record<string, [string, string]> = {
  ㅘ: ["ㅗ", "ㅏ"],
  ㅙ: ["ㅗ", "ㅐ"],
  ㅚ: ["ㅗ", "ㅣ"],
  ㅝ: ["ㅜ", "ㅓ"],
  ㅞ: ["ㅜ", "ㅔ"],
  ㅟ: ["ㅜ", "ㅣ"],
  ㅢ: ["ㅡ", "ㅣ"],
};

function isInitial(char: string): boolean {
  return INITIALS.includes(char);
}

function isMedial(char: string): boolean {
  return MEDIALS.includes(char);
}

function isFinal(char: string): boolean {
  return FINALS.includes(char) && char !== "";
}

function composeChar(
  initial: string,
  medial: string,
  final: string = "",
): string {
  const i = INITIALS.indexOf(initial);
  const m = MEDIALS.indexOf(medial);
  const f = FINALS.indexOf(final);
  if (i < 0 || m < 0 || f < 0) return initial + medial + final;
  return String.fromCharCode(0xac00 + i * 21 * 28 + m * 28 + f);
}

export function decompose(text: string): string {
  let result = "";
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7af) {
      const offset = code - 0xac00;
      const i = Math.floor(offset / (21 * 28));
      const m = Math.floor((offset % (21 * 28)) / 28);
      const f = offset % 28;

      result += INITIALS[i];

      const medial = MEDIALS[m];
      if (DECOMPOSE_MEDIALS[medial]) {
        result += DECOMPOSE_MEDIALS[medial].join("");
      } else {
        result += medial;
      }
      if (f > 0) {
        const final = FINALS[f];
        result += final;
      }
    } else {
      result += char;
    }
  }
  return result;
}

export function compose(jamos: string): string {
  const chars = jamos.split("");
  let result = "";
  let initial = "";
  let medial = "";
  let final = "";

  const flush = () => {
    if (initial && medial) {
      result += composeChar(initial, medial, final);
    } else {
      result += initial + medial + final;
    }
    initial = "";
    medial = "";
    final = "";
  };

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    // Case 1: Initial
    if (isInitial(char)) {
      if (!initial) {
        initial = char;
      } else if (!medial) {
        // Try to form compound initial
        if (COMPOUND_INITIALS[initial + char]) {
          initial = COMPOUND_INITIALS[initial + char];
        } else {
          flush();
          initial = char;
        }
      } else if (!final) {
        // Look ahead to see if this initial is followed by a medial
        const next = chars[i + 1];
        if (next && isMedial(next)) {
          flush();
          initial = char;
        } else {
          final = char;
        }
      } else {
        // Already have initial, medial, final
        const compoundFinal = COMPOUND_FINALS[final + char];
        const next = chars[i + 1];
        if (compoundFinal && !(next && isMedial(next))) {
          final = compoundFinal;
        } else {
          flush();
          initial = char;
        }
      }
      continue;
    }

    // Case 2: Medial
    if (isMedial(char)) {
      if (!initial) {
        if (!medial) {
          medial = char;
        } else {
          const compoundMedial = COMPOUND_MEDIALS[medial + char];
          if (compoundMedial) {
            medial = compoundMedial;
          } else {
            flush();
            medial = char;
          }
        }
      } else if (!medial) {
        medial = char;
      } else if (!final) {
        const compoundMedial = COMPOUND_MEDIALS[medial + char];
        if (compoundMedial) {
          medial = compoundMedial;
        } else {
          flush();
          medial = char;
        }
      } else {
        // Moving final to next initial
        let nextInitial = final;
        let prevFinal = "";
        if (DECOMPOSE_FINALS[final]) {
          [prevFinal, nextInitial] = DECOMPOSE_FINALS[final];
        }
        final = prevFinal;
        flush();
        initial = nextInitial;
        medial = char;
      }
      continue;
    }

    // Case 3: Final already in jamo sequence? (e.g., input is already 'ㄳ')
    if (isFinal(char) && initial && medial && !final) {
      const next = chars[i + 1];
      if (!(next && isMedial(next))) {
        final = char;
        continue;
      }
    }

    // Case 4: Neither (Space, Period, etc.)
    flush();
    result += char;
  }

  flush();
  return result;
}
