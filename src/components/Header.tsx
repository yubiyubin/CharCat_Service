import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ToolPick - 온라인 텍스트 도구 모음",
  description:
    "글자수 세기, 한영 변환, 텍스트 비교 등 유용한 텍스트 도구를 무료로 사용하세요.",
};
export default function Header() {
  return (
    <header className="border-b border-border bg-surface py-2">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-primary-dark/85">
          ToolPick
        </Link>
        <nav className="flex gap-4 text-text-secondary">
          <Link
            href="/char-count"
            className="hover:text-primary/80 hover:font-bold transition-colors"
          >
            글자수 세기
          </Link>
          <Link
            href="/kor-eng"
            className="hover:text-primary/80 hover:font-bold transition-colors"
          >
            한영 변환
          </Link>
          <Link
            href="/jamo-compose"
            className="hover:text-primary/80 hover:font-bold transition-colors"
          >
            자모 조합/분해기
          </Link>
        </nav>
      </div>
    </header>
  );
}
