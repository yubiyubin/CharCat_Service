"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { TOOLS } from "@/data/tools";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border dark:border-primary/10 bg-surface dark:glass mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5">
          {TOOLS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-text-secondary/70 hover:text-primary transition-premium"
            >
              {t(labelKey)}
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
