"use client";

import { useMemo, useState } from "react";
import { styles } from "@/styles";
import Toast from "@/components/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/useToast";
import { emojiCategories, emojiKeywords } from "@/data/emojis";
import { usePersistedState } from "@/hooks/usePersistedState";
import RelatedTools from "@/components/RelatedTools";

export default function EmojiPicker() {
  const [activeCategory, setActiveCategory] = usePersistedState(
    "emoji-category",
    emojiCategories[0].id,
  );
  const [search, setSearch] = useState("");
  const { toast, showToast } = useToast();
  const { t } = useLanguage();

  const handleCopy = (char: string) => {
    navigator.clipboard.writeText(char);
    showToast(`${char} ${t("emoji.toast.copied")}`);
  };

  const activeData = emojiCategories.find((c) => c.id === activeCategory);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return null;
    const allEmojis = emojiCategories.flatMap((c) => c.items);
    return allEmojis.filter((emoji) => {
      const keywords = emojiKeywords[emoji];
      if (!keywords) return false;
      return keywords.some((kw) => kw.toLowerCase().includes(query));
    });
  }, [search]);

  const displayEmojis = searchResults ?? activeData?.items ?? [];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("emoji.title")}</h1>
      <div className={styles.container}>
        {/* 검색 */}
        <div className="relative mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("emoji.searchPlaceholder")}
            className="w-full px-4 py-2.5 pl-10 rounded-lg border border-border-input bg-surface text-text-base text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-premium"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-base transition-premium"
            >
              ✕
            </button>
          )}
        </div>

        {/* 카테고리 탭 (검색 중이 아닐 때만) */}
        {!searchResults && (
          <div className="overflow-x-auto pb-2 scrollbar-hide mb-6">
            <div className="grid grid-cols-[repeat(13,1fr)] gap-2 min-w-max lg:min-w-0 lg:grid-cols-[repeat(13,1fr)]">
            {emojiCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full px-2 py-2 rounded-lg text-sm font-bold transition-premium whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-primary/20 text-primary dark:neon-border"
                    : "bg-surface-muted text-text-secondary hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <span className="text-xl lg:text-sm lg:mr-1.5">{cat.icon}</span>
                <span className="hidden lg:inline">{t(cat.labelKey)}</span>
              </button>
            ))}
            </div>
          </div>
        )}

        {searchResults && (
          <p className="text-xs text-text-secondary mb-2">
            {`${t("emoji.searchResult")} ${searchResults.length}${t("emoji.searchUnit")}`}
          </p>
        )}

        {!searchResults && (
          <p className="text-xs text-text-secondary mb-2">{t("emoji.clickHint")}</p>
        )}

        {/* 이모티콘 그리드 */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1 border-2 border-primary/30 rounded-xl p-4 bg-primary/5">
          {displayEmojis.length > 0 ? (
            displayEmojis.map((emoji, idx) => (
              <button
                key={`${emoji}-${idx}`}
                onClick={() => handleCopy(emoji)}
                className="aspect-square flex items-center justify-center text-2xl md:text-3xl rounded-lg hover:bg-primary/10 hover:scale-110 active:scale-95 transition-premium cursor-pointer"
                title={emoji}
              >
                {emoji}
              </button>
            ))
          ) : (
            <p className="col-span-full text-center text-text-secondary py-8">
              {t("emoji.noResults")}
            </p>
          )}
        </div>

        {/* 설명 섹션 */}
        <section className={`${styles.section}`}>
          <div id="about" className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>{t("emoji.sectionTitle")}</h2>
            <p className="mt-4 text-sm md:text-base text-text-light leading-relaxed">
              {t("emoji.sectionDesc")}
            </p>
          </div>
        </section>

        {toast && <Toast message={toast} />}
      </div>
      <RelatedTools
        currentPage="/emoji"
        tools={["/char-count", "/case-convert", "/text-diff", "/kor-eng", "/jamo-compose"]}
      />
    </div>
  );
}
