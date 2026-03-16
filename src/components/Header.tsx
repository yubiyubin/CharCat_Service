"use client";
import Logo from "@/logoSvg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import ModeSwitch from "./ui/ModeSwitch";
import LanguageButton from "./ui/LanguageButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/char-count", label: t("header.charCount") },
    { href: "/kor-eng", label: t("header.korEng") },
    { href: "/text-diff", label: t("header.textDiff") },
    { href: "/jamo-compose", label: t("header.jamoCompose") },
  ];

  return (
    <header className="border-b border-border bg-surface">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold text-primary-dark/85 shrink-0"
        >
          <Logo />
        </Link>

        {/* 데스크탑 nav */}
        <nav className="hidden md:flex items-center gap-x-4 text-sm md:text-base text-text-secondary font-bold">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? "text-primary/80 "
                  : "hover:text-primary/80  transition-colors"
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 우측 버튼 영역 */}
        <div className="flex items-center gap-1">
          <LanguageButton />
          <ModeSwitch />
          {/* 모바일 햄버거 */}
          <button
            className="md:hidden ml-1 p-2 rounded-full bg-surface-muted border border-border-input text-text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴"
          >
            {menuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-surface px-4 py-3 flex flex-col gap-3 text-sm text-text-secondary">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={
                pathname === href
                  ? "text-primary "
                  : "hover:text-primary transition-colors"
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
