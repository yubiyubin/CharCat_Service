import Link from "next/link";

const TOOL_LINKS = [
  { href: "/char-count", label: "글자수 세기" },
  { href: "/kor-eng", label: "한영 변환" },
  { href: "/text-diff", label: "텍스트 비교" },
  { href: "/case-convert", label: "대소문자 변환" },
  { href: "/emoji", label: "이모티콘" },
  { href: "/jamo-compose", label: "자모 조합" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-primary/10 bg-surface dark:glass mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5">
          {TOOL_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-text-secondary/70 hover:text-primary transition-premium"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-center text-xs text-text-secondary/50">
          <span className="dark:neon-text">&copy;</span> 2026 CharCat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
