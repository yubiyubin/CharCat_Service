"use client";

import React, { useMemo } from "react";
import { styles } from "@/styles";
import ConvertArrow from "@/features/kor-eng/components/convertArrow";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { dictionaries } from "@/locales";
import { usePersistedState } from "@/hooks/usePersistedState";
import RelatedTools from "@/components/RelatedTools";
import { computeTextDiff } from "@/utils/textDiff";
import { useToast } from "@/hooks/useToast";
import { copyToClipboard } from "@/utils/clipboard";

// 색상 상수 — 모듈 최상단에 선언해 렌더마다 재생성 방지
const ADDED = "text-green-700 bg-green-200/70 dark:text-green-300 dark:bg-green-500/20";
const REMOVED = "text-rose-600 line-through bg-rose-100 dark:text-rose-300 dark:bg-rose-500/20";
const SAME = "text-gray-600/80 dark:text-gray-300/90";

export default function TextDiff() {
  const { toast, showToast } = useToast();
  const [modified, setModified] = usePersistedState("text-diff-modified", "");
  const [original, setOriginal] = usePersistedState("text-diff-original", "");
  const { t, language } = useLanguage();

  const copyResult = async (text: string) => {
    const ok = await copyToClipboard(text);
    showToast(ok ? t("common.toast.resultCopied") : t("common.toast.copyFailed"));
  };
  const useCases = dictionaries[language].textDiff.useCases;

  const clearInput = () => {
    setOriginal("");
    setModified("");
    showToast(t("common.toast.cleared"));
  };

  const diffResult = useMemo(
    () => computeTextDiff(original, modified),
    [original, modified],
  );

  const result = useMemo(() => {
    if (!original && !modified) return;

    const { hasDiff, lines } = diffResult;
    if (!hasDiff) return t("textDiff.resultSame");

    const elements: React.ReactElement[] = [];

    lines.forEach((line, i) => {
      if (i > 0) elements.push(<br key={`br-${i}`} />);

      if (line.kind === "changed") {
        // 단어 단위 인라인 diff: removed+added 연속 쌍은 그룹 박스 + 화살표로 묶어 표시
        const segs = line.segments;
        let si = 0;
        while (si < segs.length) {
          const seg = segs[si];
          const next = segs[si + 1];
          if (seg.type === "removed" && next?.type === "added") {
            elements.push(
              <span
                key={`${i}-${si}-grp`}
                className="inline-flex items-center gap-1 rounded bg-primary/5 dark:bg-primary/10 px-1.5 py-0.5 mx-0.5"
              >
                <span className={REMOVED}>{seg.tokens.join("")}</span>
                <span className="text-text-secondary/50 text-xs select-none">→</span>
                <span className={ADDED}>{next.tokens.join("")}</span>
              </span>,
            );
            si += 2;
          } else {
            const cls = seg.type === "added" ? ADDED : seg.type === "removed" ? REMOVED : SAME;
            seg.tokens.forEach((tok, ti) =>
              elements.push(<span key={`${i}-${si}-${ti}`} className={cls}>{tok}</span>),
            );
            si++;
          }
        }
      } else {
        const cls = line.kind === "added" ? ADDED : line.kind === "removed" ? REMOVED : SAME;
        elements.push(<span key={`${i}`} className={cls}>{line.text}</span>);
      }
    });

    return elements;
  }, [original, modified, t, diffResult]);

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
                  copyResult(diffResult.copyText);
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
