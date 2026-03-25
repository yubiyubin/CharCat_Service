"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/useToast";
import { usePersistedState } from "@/hooks/usePersistedState";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";
import RelatedTools from "@/components/RelatedTools";
import { styles } from "@/styles";
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
} from "@/utils/caseConvert";
import { dictionaries } from "@/locales";

export default function CaseConvert() {
  const [input, setInput] = usePersistedState("case-convert-input", "");
  const { toast, showToast } = useToast();
  const { t, language } = useLanguage();
  const dict = dictionaries[language].caseConvert;

  const conversions = [
    { key: "upper",    label: t("caseConvert.buttons.upper"),    fn: toUpperCase },
    { key: "lower",    label: t("caseConvert.buttons.lower"),    fn: toLowerCase },
    { key: "title",    label: t("caseConvert.buttons.title"),    fn: toTitleCase },
    { key: "sentence", label: t("caseConvert.buttons.sentence"), fn: toSentenceCase },
    { key: "camel",    label: t("caseConvert.buttons.camel"),    fn: toCamelCase },
    { key: "pascal",   label: t("caseConvert.buttons.pascal"),   fn: toPascalCase },
    { key: "snake",    label: t("caseConvert.buttons.snake"),    fn: toSnakeCase },
    { key: "kebab",    label: t("caseConvert.buttons.kebab"),    fn: toKebabCase },
    { key: "constant", label: t("caseConvert.buttons.constant"), fn: toConstantCase },
  ];

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(t("caseConvert.toast.copied"));
  };

  const clearInput = () => {
    setInput("");
    showToast(t("caseConvert.toast.cleared"));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("caseConvert.title")}</h1>
      <div className={styles.container}>
        {/* 입력 영역 */}
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("caseConvert.placeholder")}
        />
        <div className={styles.buttonContainer}>
          <ActionButton onClick={clearInput} label={t("common.clear")} />
        </div>

        {/* 9가지 변환 결과 그리드 */}
        {input && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {conversions.map(({ key, label, fn }) => {
              const result = fn(input);
              return (
                <div
                  key={key}
                  data-testid={`case-result-${key}`}
                  className="flex flex-col gap-2 bg-surface rounded-xl p-4 border border-primary/10 dark:glass-card dark:neon-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-primary/70 bg-primary/[0.06] dark:bg-primary/10 px-2 py-0.5 rounded">
                      {label}
                    </span>
                    <button
                      data-testid={`copy-${key}`}
                      onClick={() => copyResult(result)}
                      className="text-xs text-text-secondary hover:text-primary transition-colors px-2 py-0.5 rounded hover:bg-primary/10"
                    >
                      {t("common.copy")}
                    </button>
                  </div>
                  <p className="text-sm font-mono text-text-base break-all leading-relaxed min-h-[1.5rem]">
                    {result}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* About 섹션 */}
        <section className={styles.section}>
          <div id="about" className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>{t("caseConvert.sectionTitle")}</h2>
            <p className="mt-4 text-sm md:text-base text-text-light leading-relaxed">
              {t("caseConvert.sectionDesc")}
            </p>
          </div>

          {/* 예시 섹션 */}
          <div id="examples" className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-bold text-text-base">
              {t("caseConvert.examplesTitle")}
            </h2>
            <div className="mt-4 space-y-3">
              {dict.examples.map((ex) => (
                <div
                  key={ex.label}
                  className="grid grid-cols-3 items-center text-sm md:text-base bg-surface rounded-lg px-6 py-3"
                >
                  <span className="text-text-secondary font-mono">{ex.from}</span>
                  <span className="text-primary-600 text-center font-medium text-xs">
                    {ex.label}
                  </span>
                  <span className="text-text-base font-medium text-right font-mono">
                    {ex.to}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {toast && <Toast message={toast} />}
      </div>

      <RelatedTools
        currentPage="/case-convert"
        tools={["/char-count", "/kor-eng", "/text-diff", "/jamo-compose", "/emoji"]}
      />
    </div>
  );
}
