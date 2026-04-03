/** 앱 전체에서 사용하는 도구 목록 단일 소스 */
export interface ToolInfo {
  href: string;
  icon: string;
  /** 번역 키 (header.charCount 등) */
  labelKey: string;
}

export const TOOLS: ToolInfo[] = [
  { href: "/char-count", icon: "📊", labelKey: "header.charCount" },
  { href: "/kor-eng", icon: "🔄", labelKey: "header.korEng" },
  { href: "/text-diff", icon: "🔍", labelKey: "header.textDiff" },
  { href: "/case-convert", icon: "Aa", labelKey: "header.caseConvert" },
  { href: "/emoji", icon: "😊", labelKey: "header.emoji" },
  { href: "/jamo-compose", icon: "🧩", labelKey: "header.jamoCompose" },
];

/** href로 도구 정보 조회 */
export function getToolByHref(href: string): ToolInfo | undefined {
  return TOOLS.find((t) => t.href === href);
}
