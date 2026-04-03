"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getToolByHref } from "@/data/tools";

interface RelatedToolsProps {
  /** 현재 페이지의 href (목록에서 제외됨) */
  currentPage: string;
  /** 표시할 관련 도구 href 배열 */
  tools: string[];
}

export default function RelatedTools({ currentPage, tools }: RelatedToolsProps) {
  const { t } = useLanguage();

  const filtered = tools.filter((href) => href !== currentPage);
  if (filtered.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 pb-12 md:px-6 lg:px-8">
      <p className="text-xs font-semibold text-text-secondary/60 uppercase tracking-widest mb-3">
        {t("common.relatedToolsTitle")}
      </p>
      <div className="flex flex-wrap gap-2">
        {filtered.map((href) => {
          const tool = getToolByHref(href);
          if (!tool) return null;
          return (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full bg-primary/[0.06] dark:bg-primary/10 text-primary/80 dark:text-primary-light border border-primary/10 dark:neon-border hover:bg-primary/15 hover:border-primary/30 transition-all"
            >
              <span>{tool.icon}</span>
              <span>{t(tool.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
