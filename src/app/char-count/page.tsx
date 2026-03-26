"use client";
import ActionButton from "@/components/ActionButton";
import StatCard from "@/features/char-count/components/StatCard";
import Toast from "@/components/Toast";
import { styles } from "@/styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { dictionaries } from "@/locales";
import { useToast } from "@/hooks/useToast";
import { usePersistedState } from "@/hooks/usePersistedState";
import RelatedTools from "@/components/RelatedTools";

export default function CharCount() {
  const [text, setText] = usePersistedState("char-count-input", "");
  const { toast, showToast } = useToast();
  const { t, language } = useLanguage();
  const dict = dictionaries[language].charCount;
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const stats = {
    charWithSpaces: text.length,
    charWithoutSpaces: text.replace(/\s/g, "").length,
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    sentences:
      text.trim() === ""
        ? 0
        : text.split(/[.!?]+/).filter((s) => s.trim()).length,
    lines: text === "" ? 0 : text.split("\n").length,
    bytes: new TextEncoder().encode(text).length,
  };

  const statItems = [
    { id: "char-with-spaces", value: stats.charWithSpaces, label: t("charCount.stats.withSpaces") },
    { id: "char-without-spaces", value: stats.charWithoutSpaces, label: t("charCount.stats.withoutSpaces") },
    { id: "word-count", value: stats.words, label: t("charCount.stats.words") },
    { id: "sentence-count", value: stats.sentences, label: t("charCount.stats.sentences") },
    { id: "line-count", value: stats.lines, label: t("charCount.stats.lines") },
    { id: "byte-count", value: stats.bytes, label: t("charCount.stats.bytes") },
  ];

  const copyText = () => {
    navigator.clipboard.writeText(text);
    showToast(t("charCount.toast.copied"));
  };

  const clearText = () => {
    setText("");
    showToast(t("charCount.toast.cleared"));
  };

  const removeSpaces = () => {
    setText(text.replace(/ /g, ""));
    showToast(t("charCount.toast.spacesRemoved"));
  };

  const removeLineBreaks = () => {
    setText(text.replace(/\n/g, " "));
    showToast(t("charCount.toast.lineBreaksRemoved"));
  };

  const actions = [
    { onClick: copyText, label: t("charCount.actions.copy") },
    { onClick: clearText, label: t("charCount.actions.clear") },
    { onClick: removeSpaces, label: t("charCount.actions.removeSpaces") },
    { onClick: removeLineBreaks, label: t("charCount.actions.removeLineBreaks") },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("charCount.title")}</h1>
      <div className={styles.container}>
        <textarea
          value={text}
          onChange={onChangeHandler}
          placeholder={t("charCount.placeholder")}
          className={styles.textarea}
        />
        <div className={`${styles.buttonContainer} grid-cols-2 sm:grid-cols-4`}>
          {actions.map((action) => (
            <ActionButton
              key={action.label}
              onClick={action.onClick}
              label={action.label}
            />
          ))}
        </div>
        <section id="stats" aria-label="Statistics" className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {statItems.map((item) => (
            <div key={item.id} id={item.id}>
              <StatCard value={item.value} label={item.label} />
            </div>
          ))}
        </section>

        <section className={`${styles.section} sm:grid-cols-2`}>
          <div id="char-limit-guide" className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>{t("charCount.section1Title")}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {dict.section1Items.map((item, idx) => {
                const pct = item.maxChars && stats.charWithSpaces > 0
                  ? Math.min((stats.charWithSpaces / item.maxChars) * 100, 100)
                  : 0;
                const isOver = stats.charWithSpaces > (item.maxChars ?? 0);
                const barColor = isOver
                  ? "bg-red-400 dark:bg-red-500"
                  : pct >= 90
                  ? "bg-amber-400 dark:bg-amber-500"
                  : pct >= 70
                  ? "bg-primary/60 dark:bg-primary/80"
                  : "bg-primary";
                const textColor = isOver
                  ? "text-red-400 dark:text-red-500"
                  : pct >= 90
                  ? "text-amber-400 dark:text-amber-500"
                  : "text-primary dark:text-primary-light";
                return (
                  <li
                    key={idx}
                    className={`pb-2 ${idx < dict.section1Items.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <div className="flex justify-between">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.limit}</span>
                    </div>
                    {item.maxChars && stats.charWithSpaces > 0 && (
                      <div className="mt-1.5">
                        <div className="w-full h-1.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className={`text-right text-[10px] mt-0.5 ${textColor}`}>
                          {stats.charWithSpaces.toLocaleString()} / {item.maxChars.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div id="byte-guide" className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>{t("charCount.section2Title")}</h2>
            <p className="mt-4 text-sm text-text-light leading-relaxed">
              {t("charCount.section2Desc")}
            </p>
            <div className="mt-4 bg-surface rounded-lg p-4 space-y-2">
              {dict.byteExamples.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span>{item.bytes}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {toast && <Toast message={toast} />}
      </div>
      <RelatedTools
        currentPage="/char-count"
        tools={["/kor-eng", "/text-diff", "/case-convert", "/jamo-compose", "/emoji"]}
      />
    </div>
  );
}
