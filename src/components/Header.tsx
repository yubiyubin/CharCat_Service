"use client";
import Logo from "@/logoSvg";
import { Metadata } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "ToolPick - 온라인 텍스트 도구 모음",
  description:
    "글자수 세기, 한영 변환, 텍스트 비교 등 유용한 텍스트 도구를 무료로 사용하세요.",
};
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface py-2">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row  justify-between gap-4 md:gap-0">
        <Link href="/" className="text-3xl font-bold text-primary-dark/85">
          <Logo />
        </Link>
        <nav className="flex flex-wrap mt-3 items-center justify-center gap-x-4 gap-y-2 text-sm md:text-base text-text-secondary">
          <Link
            href="/char-count"
            className={
              pathname === "/char-count"
                ? "text-primary/80 font-bold"
                : "hover:text-primary/80 hover:font-bold transition-colors"
            }
          >
            글자수 세기
          </Link>
          <Link
            href="/kor-eng"
            className={
              pathname === "/kor-eng"
                ? "text-primary/80 font-bold"
                : "hover:text-primary/80 hover:font-bold transition-colors"
            }
          >
            한영 변환
          </Link>
          <Link
            href="/text-diff"
            className={
              pathname === "/text-diff"
                ? "text-primary/80 font-bold"
                : "hover:text-primary/80 hover:font-bold transition-colors"
            }
          >
            텍스트 비교
          </Link>
          <Link
            href="/jamo-compose"
            className={
              pathname === "/jamo-compose"
                ? "text-primary/80 font-bold"
                : "hover:text-primary/80 hover:font-bold transition-colors"
            }
          >
            자모 조합/분해기
          </Link>
        </nav>
      </div>
    </header>
  );
}
