"use client";

import { compose, decompose } from "@/utils/hangulCompose";
import { useLanguage } from "@/contexts/LanguageContext";
import ConverterPage from "@/components/ConverterPage";
import RelatedTools from "@/components/RelatedTools";

export default function JamoCompose() {
  const { t } = useLanguage();

  return (
    <ConverterPage
      pageKey="jamo-compose"
      converters={[compose, decompose]}
      labels={{
        forward: [t("jamoCompose.labelJamo"), t("jamoCompose.labelHangul")],
        reverse: [t("jamoCompose.labelHangul"), t("jamoCompose.labelJamo")],
      }}
      placeholders={[
        t("jamoCompose.placeholderCompose"),
        t("jamoCompose.placeholderDecompose"),
      ]}
      title={[t("jamoCompose.titleCompose"), t("jamoCompose.titleDecompose")]}
      about={{
        title: t("jamoCompose.sectionTitle"),
        description: t("jamoCompose.sectionDesc"),
      }}
      examples={{
        title: t("jamoCompose.examplesTitle"),
        items: [
          { from: "ㅇㅏㄴㄴㅕㅇ", to: "안녕" },
          { from: "ㅎㅏㄴㄱㅡㄹ", to: "한글" },
          { from: "ㄱㅏㅁㅅㅏㅎㅏㅁㄴㅣㄷㅏ", to: "감사합니다" },
        ],
      }}
      footer={
        <RelatedTools
          currentPage="/jamo-compose"
          tools={["/char-count", "/kor-eng", "/text-diff", "/case-convert", "/emoji"]}
        />
      }
    />
  );
}
