"use client";

import { toUpperCase, toLowerCase } from "@/utils/caseConvert";
import { useLanguage } from "@/contexts/LanguageContext";
import ConverterPage from "@/components/ConverterPage";

export default function CaseConvert() {
  const { t } = useLanguage();

  return (
    <ConverterPage
      pageKey="case-convert"
      converters={[toUpperCase, toLowerCase]}
      labels={{
        forward: [t("caseConvert.buttons.lower"), t("caseConvert.buttons.upper")],
        reverse: [t("caseConvert.buttons.upper"), t("caseConvert.buttons.lower")],
      }}
      placeholders={[
        t("caseConvert.placeholder"),
        t("caseConvert.placeholder"),
      ]}
      title={t("caseConvert.title")}
      about={{
        title: t("caseConvert.sectionTitle"),
        description: t("caseConvert.sectionDesc"),
      }}
      examples={{
        title: t("caseConvert.examplesTitle"),
        items: [
          { from: "hello world", to: "HELLO WORLD" },
          { from: "HELLO WORLD", to: "hello world" },
          { from: "Hello World", to: "HELLO WORLD" },
        ],
      }}
    />
  );
}
