"use client";

import { useMemo, useState } from "react";
import { styles } from "@/styles";
import ConvertArrow from "@/features/kor-eng/components/convertArrow";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";
import { compose, decompose } from "@/utils/hangulCompose";
import { useConverterState } from "@/hooks/useConverterState";
import { useLanguage } from "@/contexts/LanguageContext";

export default function JamoCompose() {
  const { input, setInput, toast, textareaRef, copyResult, clearInput } =
    useConverterState();
  const [direction, setDirection] = useState<"compose" | "decompose">(
    "compose",
  );
  const { t } = useLanguage();

  const result = useMemo(() => {
    return direction === "compose" ? compose(input) : decompose(input);
  }, [input, direction]);

  const onClickConvert = () => {
    setDirection(direction === "compose" ? "decompose" : "compose");
  };

  const title =
    direction === "compose"
      ? t("jamoCompose.titleCompose")
      : t("jamoCompose.titleDecompose");
  const fromLabel =
    direction === "compose"
      ? t("jamoCompose.labelJamo")
      : t("jamoCompose.labelHangul");
  const toLabel =
    direction === "compose"
      ? t("jamoCompose.labelHangul")
      : t("jamoCompose.labelJamo");
  const placeholder =
    direction === "compose"
      ? t("jamoCompose.placeholderCompose")
      : t("jamoCompose.placeholderDecompose");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textareaContainer}>
            <div className={styles.flexContainer}>
              <span className={styles.w20TextCenter}>{fromLabel}</span>
              <button onClick={onClickConvert} className={styles.convertButton}>
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
          <div className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>{t("jamoCompose.sectionTitle")}</h2>
            <p className="mt-4 text-sm text-text-light leading-relaxed">
              {t("jamoCompose.sectionDesc")}
            </p>
          </div>

          <div className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-bold text-text-base">
              {t("jamoCompose.examplesTitle")}
            </h2>
            <div className="mt-4 space-y-3">
              {[
                { from: "ㅇㅏㄴㄴㅕㅇ", to: "안녕" },
                { from: "ㅎㅏㄴㄱㅡㄹ", to: "한글" },
                { from: "ㄱㅏㅁㅅㅏㅎㅏㅁㄴㅣㄷㅏ", to: "감사합니다" },
              ].map((ex) => (
                <div
                  key={ex.from}
                  className="grid grid-cols-3 items-center text-medium bg-surface rounded-lg p-3"
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
