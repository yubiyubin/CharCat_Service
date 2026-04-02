/** 비알파벳/숫자/한글 문자를 제거하고 단어 배열로 분리 */
function splitWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9가-힣]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** UPPERCASE */
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

/** lowercase */
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

/** Title Case — 각 단어의 첫 글자를 대문자로 */
export function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
}

/** Sentence case — 각 문장의 첫 글자만 대문자로 */
export function toSentenceCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
}

/** camelCase */
export function toCamelCase(text: string): string {
  return splitWords(text)
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
}

/** PascalCase */
export function toPascalCase(text: string): string {
  return splitWords(text)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/** snake_case */
export function toSnakeCase(text: string): string {
  return splitWords(text).join("_").toLowerCase();
}

/** kebab-case */
export function toKebabCase(text: string): string {
  return splitWords(text).join("-").toLowerCase();
}

/** CONSTANT_CASE */
export function toConstantCase(text: string): string {
  return splitWords(text).join("_").toUpperCase();
}

/** aLtErNaTiNg CaSe — 알파벳만 대소문자를 교대로 변환, 비알파벳 문자는 유지 */
export function toAlternatingCase(text: string): string {
  let alphaIndex = 0;
  return text
    .split("")
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const result =
          alphaIndex % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        alphaIndex++;
        return result;
      }
      return char;
    })
    .join("");
}
