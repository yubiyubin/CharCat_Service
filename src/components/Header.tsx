"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import ModeSwitch from "./ui/ModeSwitch";
import LanguageButton from "./ui/LanguageButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../public/logo";

export default function Header() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/char-count",
      label: t("header.charCount"),
      shortLabel: t("header.charCountShort"),
    },
    ...(language === "ko"
      ? [
          {
            href: "/kor-eng",
            label: t("header.korEng"),
            shortLabel: t("header.korEngShort"),
          },
        ]
      : []),
    {
      href: "/text-diff",
      label: t("header.textDiff"),
      shortLabel: t("header.textDiffShort"),
    },
    {
      href: "/case-convert",
      label: t("header.caseConvert"),
      shortLabel: t("header.caseConvertShort"),
    },
    {
      href: "/emoji",
      label: t("header.emoji"),
      shortLabel: t("header.emojiShort"),
    },
    ...(language === "ko"
      ? [
          {
            href: "/jamo-compose",
            label: t("header.jamoCompose"),
            shortLabel: t("header.jamoComposeShort"),
          },
        ]
      : []),
  ];

  return (
    <header className="border-b border-border bg-surface dark:glass dark:neon-border dark:border-b-0 dark:border-b dark:border-primary/15 transition-premium">
      <div className="max-w-5xl mx-auto px-3 md:px-4 py-3 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center gap-0 text-3xl font-bold text-primary-dark/85 dark:neon-text shrink-0 transition-premium -ml-1"
        >
          <Logo />
        </Link>

        {/* 데스크탑 nav */}
        <nav className="hidden md:flex text-lg justify-between gap-x-8 lg:gap-x-5 text-base lg:text-base text-text-secondary font-bold pt-3 whitespace-nowrap">
          {navLinks.map(({ href, label, shortLabel }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? "text-primary/90 dark:neon-text"
                  : "hover:text-primary/80 dark:hover:text-primary-light transition-premium"
              }
            >
              <span className="lg:hidden">{shortLabel}</span>
              <span className="hidden lg:inline">{label}</span>
            </Link>
          ))}
        </nav>

        {/* 우측 버튼 영역 */}
        <div className="flex items-center gap-1 pt-3">
          <LanguageButton />
          <ModeSwitch />
          {/* 모바일 햄버거 */}
          <button
            className="md:hidden ml-1 p-2 rounded-full bg-surface-muted border border-border-input text-text-secondary hover:bg-primary/10 hover:text-primary dark:neon-border-hover transition-premium"
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
        <nav className="md:hidden border-t border-border dark:glass dark:border-primary/10 px-4 py-3 flex flex-col gap-3 text-sm text-text-secondary">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={
                pathname === href
                  ? "text-primary dark:neon-text"
                  : "hover:text-primary transition-premium"
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
