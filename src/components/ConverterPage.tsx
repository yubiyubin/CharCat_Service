"use client";

import { useMemo, useState } from "react";
import { styles } from "@/styles";
import ConvertArrow from "@/features/kor-eng/components/convertArrow";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";
import { useConverterState } from "@/hooks/useConverterState";
import { useLanguage } from "@/contexts/LanguageContext";

interface Example {
  from: string;
  to: string;
}

interface ConverterPageProps {
  /** 두 방향의 변환 함수. [정방향, 역방향] */
  converters: [(text: string) => string, (text: string) => string];
  /** 방향별 라벨. { forward: [from, to], reverse: [from, to] } */
  labels: { forward: [string, string]; reverse: [string, string] };
  /** 방향별 placeholder. [정방향, 역방향] */
  placeholders: [string, string];
  /** 페이지 제목. 단일 문자열이면 고정, [정방향, 역방향]이면 방향에 따라 변경 */
  title: string | [string, string];
  /** About 섹션 */
  about: { title: string; description: string };
  /** 예제 섹션 */
  examples: { title: string; items: Example[] };
  /** sessionStorage 캐시 키 */
  pageKey?: string;
}

export default function ConverterPage({
  converters,
  labels,
  placeholders,
  title,
  about,
  examples,
  pageKey = "converter",
}: ConverterPageProps) {
  const { input, setInput, toast, textareaRef, copyResult, clearInput } =
    useConverterState(pageKey);
  const [isForward, setIsForward] = useState(true);
  const { t } = useLanguage();

  const [forwardFn, reverseFn] = converters;
  const result = useMemo(
    () => (isForward ? forwardFn(input) : reverseFn(input)),
    [input, isForward, forwardFn, reverseFn],
  );

  const [fromLabel, toLabel] = isForward ? labels.forward : labels.reverse;
  const placeholder = isForward ? placeholders[0] : placeholders[1];
  const pageTitle = Array.isArray(title) ? (isForward ? title[0] : title[1]) : title;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{pageTitle}</h1>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textareaContainer}>
            <div className={styles.flexContainer}>
              <span className={styles.w20TextCenter}>{fromLabel}</span>
              <button
                onClick={() => setIsForward((prev) => !prev)}
                className={styles.convertButton}
              >
                <ConvertArrow />
              </button>
              <span className={styles.w20TextCenter}>{toLabel}</span>
            </div>
            <textarea
              ref={textareaRef}
              className={styles.noneBorderTextarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
            />
          </div>
          <div className={styles.resultTextarea}>
            <div className={styles.resultTextareaContent}>
              {result || (
                <span className={styles.resultTextareaPlaceholder}>
                  {t("common.resultPlaceholder")}
                </span>
              )}
            </div>
            <div className={styles.actionButtonContainer}>
              <ActionButton
                onClick={() => copyResult(result)}
                label={t("common.copyResult")}
              />
              <ActionButton onClick={clearInput} label={t("common.clear")} />
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div id="about" className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>{about.title}</h2>
            <p className="mt-4 text-sm md:text-base text-text-light leading-relaxed">
              {about.description}
            </p>
          </div>

          <div id="examples" className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-bold text-text-base">
              {examples.title}
            </h2>
            <div className="mt-4 space-y-3">
              {examples.items.map((ex) => (
                <div
                  key={ex.from}
                  className="grid grid-cols-3 items-center text-sm md:text-base bg-surface rounded-lg px-6 py-3"
                >
                  <span className="text-text-secondary font-mono">{ex.from}</span>
                  <span className="text-primary-600 text-center">→</span>
                  <span className="text-text-base font-medium text-right">
                    {ex.to}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}
