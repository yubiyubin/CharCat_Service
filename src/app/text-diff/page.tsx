"use client";

import { useMemo } from "react";
import { styles } from "@/styles";
import ConvertArrow from "@/features/kor-eng/components/convertArrow";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";
import { useConverterState } from "@/hooks/useConverterState";
import { useLanguage } from "@/contexts/LanguageContext";
import { dictionaries } from "@/locales";
import { diffChars } from "diff";
import { usePersistedState } from "@/hooks/usePersistedState";
import RelatedTools from "@/components/RelatedTools";

export default function TextDiff() {
  const { toast, copyResult, showToast } = useConverterState("text-diff");
  const [modified, setModified] = usePersistedState("text-diff-modified", "");
  const [original, setOriginal] = usePersistedState("text-diff-original", "");
  const { t, language } = useLanguage();
  const useCases = dictionaries[language].textDiff.useCases;

  const diffs = diffChars(original, modified);
  const hasDiff = diffs.some((part) => part.added || part.removed);

  const clearInput = () => {
    setOriginal("");
    setModified("");
    showToast(t("common.toast.cleared"));
  };

  const result = useMemo(() => {
    if (!original && !modified) {
      return;
    }
    if (!hasDiff) {
      return t("textDiff.resultSame");
    }
    return diffs.map((part, index) => {
      const color = part.added
        ? "text-green-600/60 bg-green-200/70"
        : part.removed
          ? "text-rose-400/70 line-through bg-rose-100"
          : "text-gray-600/80";
      return (
        <span key={index} className={color}>
          {part.value}
        </span>
      );
    });
  }, [original, modified, diffs, hasDiff, t]);

  const onClickConvert = () => {
    setOriginal(modified);
    setModified(original);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("textDiff.title")}</h1>
      <div className={styles.container}>
        <div className={styles.textareaContainer}>
          {/* 데스크탑 전용: 라벨 + 스왑 버튼 상단 행 */}
          <div className={`${styles.flexContainer} hidden md:flex`}>
            <span className="flex-1 text-center">{t("textDiff.labelOriginal")}</span>
            <button data-testid="swap-button" onClick={onClickConvert} className={styles.convertButton}>
              <ConvertArrow />
            </button>
            <span className="flex-1 text-center">{t("textDiff.labelModified")}</span>
          </div>
          <div className="grid gap-0 md:gap-4 md:grid-cols-[1fr_auto_1fr] flex-1 min-h-0">
            {/* 원본 textarea */}
            <div>
              <p className="md:hidden text-center text-sm font-bold text-text-primary/60 mt-3 mb-0">
                {t("textDiff.labelOriginal")}
              </p>
              <textarea
                className={styles.noneBorderTextarea}
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                placeholder={t("textDiff.placeholderOriginal")}
              />
            </div>
            {/* 데스크탑 수직 구분선 */}
            <div className="hidden md:block w-[1px] bg-border-input my-4" />
            {/* 수정 textarea */}
            <div>
              <div className="md:hidden flex items-center justify-between mt-2 mb-0 px-2">
                <span className="text-sm font-bold text-text-primary/60">{t("textDiff.labelModified")}</span>
                <button onClick={onClickConvert} className={`${styles.convertButton} text-xs`}>
                  <ConvertArrow />
                </button>
              </div>
              <textarea
                className={styles.noneBorderTextarea}
                value={modified}
                onChange={(e) => setModified(e.target.value)}
                placeholder={t("textDiff.placeholderModified")}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.resultTextarea} mt-4`}>
          <div data-testid="result-area" className={styles.resultTextareaContent}>
            {result || (
              <span className={styles.resultTextareaPlaceholder}>
                {t("textDiff.resultPlaceholder")}
              </span>
            )}
          </div>
          <div className={styles.actionButtonContainer}>
            <ActionButton
              onClick={() => {
                if (typeof result === "string") {
                  copyResult(result);
                } else {
                  const textToCopy = diffs
                    .map(
                      (part) =>
                        `${part.added ? "+" : part.removed ? "-" : ""}${part.value}`,
                    )
                    .join("");
                  copyResult(textToCopy);
                }
              }}
              label={t("common.copyResult")}
            />
            <ActionButton onClick={clearInput} label={t("common.clear")} />
          </div>
        </div>

        <section className={styles.section}>
          <div id="about" className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>{t("textDiff.sectionTitle")}</h2>
            <p className="mt-4 text-sm text-text-light leading-relaxed whitespace-pre-line">
              {t("textDiff.sectionDesc")}
            </p>
          </div>
          <div id="use-cases" className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>{t("textDiff.useCasesTitle")}</h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {useCases.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-3 sm:p-4 bg-surface rounded-xl shadow-sm border border-primary/5 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-text-secondary font-medium text-sm sm:text-base group-hover:text-text-primary transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {toast && <Toast message={toast} />}
      </div>
      <RelatedTools
        currentPage="/text-diff"
        tools={["/char-count", "/kor-eng", "/case-convert", "/jamo-compose", "/emoji"]}
      />
    </div>
  );
}
