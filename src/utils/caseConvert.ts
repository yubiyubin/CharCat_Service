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
  return text
    .replace(/[^a-zA-Z0-9가-힣]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
}

/** PascalCase */
export function toPascalCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9가-힣]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/** snake_case */
export function toSnakeCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9가-힣]+/g, " ")
    .trim()
    .split(/\s+/)
    .join("_")
    .toLowerCase();
}

/** kebab-case */
export function toKebabCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9가-힣]+/g, " ")
    .trim()
    .split(/\s+/)
    .join("-")
    .toLowerCase();
}

/** CONSTANT_CASE */
export function toConstantCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9가-힣]+/g, " ")
    .trim()
    .split(/\s+/)
    .join("_")
    .toUpperCase();
}

/** TODO(human): aLtErNaTiNg CaSe 변환 함수를 구현하세요.
 * 입력: "hello world" → 출력: "hElLo WoRlD"
 * 알파벳 문자만 대소문자를 교대로 변환하고, 공백·숫자 등은 그대로 유지합니다.
 */
export function toAlternatingCase(text: string): string {
  return text; // 여기에 구현
}
