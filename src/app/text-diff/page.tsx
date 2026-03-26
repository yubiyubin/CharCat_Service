"use client";

import React, { useMemo } from "react";
import { styles } from "@/styles";
import ConvertArrow from "@/features/kor-eng/components/convertArrow";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";
import { useConverterState } from "@/hooks/useConverterState";
import { useLanguage } from "@/contexts/LanguageContext";
import { dictionaries } from "@/locales";
import { diffArrays } from "diff";
import { usePersistedState } from "@/hooks/usePersistedState";
import RelatedTools from "@/components/RelatedTools";

export default function TextDiff() {
  const { toast, copyResult, showToast } = useConverterState("text-diff");
  const [modified, setModified] = usePersistedState("text-diff-modified", "");
  const [original, setOriginal] = usePersistedState("text-diff-original", "");
  const { t, language } = useLanguage();
  const useCases = dictionaries[language].textDiff.useCases;

  // 줄 배열로 변환 후 diffArrays로 비교 — 줄 간 1:1 매칭을 명시적으로 제어하기 위함
  const lineDiffs = diffArrays(original.split("\n"), modified.split("\n"));
  const hasDiff = lineDiffs.some((part) => part.added || part.removed);

  const clearInput = () => {
    setOriginal("");
    setModified("");
    showToast(t("common.toast.cleared"));
  };

  const result = useMemo(() => {
    if (!original && !modified) return;
    if (!hasDiff) return t("textDiff.resultSame");

    const tokenize = (text: string): string[] =>
      text.split(/(\s+)/).filter((tok) => tok.length > 0);

    const ADDED = "text-green-700 bg-green-200/70 dark:text-green-300 dark:bg-green-500/20";
    const REMOVED = "text-rose-600 line-through bg-rose-100 dark:text-rose-300 dark:bg-rose-500/20";
    const SAME = "text-gray-600/80 dark:text-gray-300/90";

    // 단어 diff 결과를 렌더링: 연속된 removed+added 쌍은 그룹 박스 + 화살표로 표시
    const renderWordDiffs = (
      wordDiffs: ReturnType<typeof diffArrays<string>>,
      keyPrefix: string,
    ): React.ReactElement[] => {
      const result: React.ReactElement[] = [];
      let wi = 0;
      while (wi < wordDiffs.length) {
        const wp = wordDiffs[wi];
        const wn = wordDiffs[wi + 1];
        if (wp.removed && wn?.added) {
          result.push(
            <span
              key={`${keyPrefix}-${wi}-grp`}
              className="inline-flex items-center gap-1 rounded bg-primary/5 dark:bg-primary/10 px-1.5 py-0.5 mx-0.5"
            >
              <span className={REMOVED}>{wp.value.join("")}</span>
              <span className="text-text-secondary/50 text-xs select-none">→</span>
              <span className={ADDED}>{wn.value.join("")}</span>
            </span>,
          );
          wi += 2;
        } else {
          const cls = wp.added ? ADDED : wp.removed ? REMOVED : SAME;
          wp.value.forEach((tok, ti) =>
            result.push(<span key={`${keyPrefix}-${wi}-${ti}`} className={cls}>{tok}</span>),
          );
          wi++;
        }
      }
      return result;
    };

    const elements: React.ReactElement[] = [];
    let i = 0;

    while (i < lineDiffs.length) {
      const cur = lineDiffs[i];
      const next = lineDiffs[i + 1];

      if (i > 0) elements.push(<br key={`br-pre-${i}`} />);

      if (cur.removed && next?.added) {
        // 변경된 줄 블록: 줄 단위로 1:1 매칭 후 단어 인라인 diff
        const removedLines = cur.value;
        const addedLines = next.value;
        const pairCount = Math.min(removedLines.length, addedLines.length);

        for (let j = 0; j < pairCount; j++) {
          if (j > 0) elements.push(<br key={`br-${i}-${j}`} />);
          const wordDiffs = diffArrays(tokenize(removedLines[j]), tokenize(addedLines[j]));
          elements.push(...renderWordDiffs(wordDiffs, `${i}-${j}`));
        }
        // 남은 removed 줄 (대응하는 added 없음)
        for (let j = pairCount; j < removedLines.length; j++) {
          elements.push(<br key={`br-rm-${i}-${j}`} />);
          elements.push(<span key={`${i}-rm-${j}`} className={REMOVED}>{removedLines[j]}</span>);
        }
        // 남은 added 줄 (대응하는 removed 없음)
        for (let j = pairCount; j < addedLines.length; j++) {
          elements.push(<br key={`br-add-${i}-${j}`} />);
          elements.push(<span key={`${i}-add-${j}`} className={ADDED}>{addedLines[j]}</span>);
        }
        i += 2;
      } else {
        // 변경 없거나 단독 추가/삭제 블록
        const cls = cur.added ? ADDED : cur.removed ? REMOVED : SAME;
        cur.value.forEach((line, li) => {
          if (li > 0) elements.push(<br key={`br-${i}-${li}`} />);
          elements.push(<span key={`${i}-${li}`} className={cls}>{line}</span>);
        });
        i++;
      }
    }

    return elements;
  }, [original, modified, lineDiffs, hasDiff, t]);

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
                  const prefix = (part: { added?: boolean; removed?: boolean }) =>
                    part.added ? "+" : part.removed ? "-" : "";
                  const textToCopy = lineDiffs
                    .map((part) => part.value.map((l) => `${prefix(part)}${l}`).join("\n"))
                    .join("\n");
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
