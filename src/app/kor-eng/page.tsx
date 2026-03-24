"use client";

import { engToKor, korToEng } from "@/features/kor-eng/utils/korEngMap";
import { useLanguage } from "@/contexts/LanguageContext";
import ConverterPage from "@/components/ConverterPage";

export default function KorEng() {
  const { t } = useLanguage();

  return (
    <ConverterPage
      pageKey="kor-eng"
      converters={[engToKor, korToEng]}
      labels={{
        forward: [t("korEng.labelEng"), t("korEng.labelKor")],
        reverse: [t("korEng.labelKor"), t("korEng.labelEng")],
      }}
      placeholders={[
        t("korEng.placeholderEngToKor"),
        t("korEng.placeholderKorToEng"),
      ]}
      title={t("korEng.title")}
      about={{
        title: t("korEng.sectionTitle"),
        description: t("korEng.sectionDesc"),
      }}
      examples={{
        title: t("korEng.examplesTitle"),
        items: [
          { from: "dkssud", to: "안녕" },
          { from: "gksrmf", to: "한글" },
          { from: "ㅗ디ㅣㅐ", to: "hello" },
        ],
      }}
    />
  );
}
