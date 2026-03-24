import type { Metadata } from "next";
import JsonLdLayout from "@/components/JsonLdLayout";

export const metadata: Metadata = {
  title:
    "자모 조합기 · Jamo Composer | 자음 모음 합치기 · 한글 분해 - CharCat",
  description:
    "Free Korean Jamo composer and decomposer. Reassemble separated Korean consonants and vowels into complete Hangul characters. ㅇㅏㄴㄴㅕㅇ → 안녕. 분리된 자모를 완성된 한글로 조합하는 무료 온라인 도구.",
  keywords: [
    "자모 조합",
    "자음 모음 합치기",
    "자모 분해",
    "한글 자모 조합기",
    "분리된 한글 합치기",
    "깨진 한글 복구",
    "jamo composer",
    "jamo decomposer",
    "hangul jamo",
    "korean jamo combiner",
    "hangul composer",
    "separated hangul fix",
    "broken korean text fix",
  ],
  alternates: {
    canonical: "/jamo-compose",
  },
};

const BASE_URL = "https://charcat.vercel.app";

export default function JamoComposeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JsonLdLayout
      name="CharCat Jamo Composer"
      alternateName="CharCat 자모 조합기"
      url={`${BASE_URL}/jamo-compose`}
      description="Free online tool to compose separated Korean Jamo (consonants and vowels) into complete Hangul characters, or decompose Hangul into individual Jamo."
      faqs={[
        {
          question: "자모 조합기란 무엇인가요?",
          answer:
            "복사 붙여넣기 과정에서 한글이 자음과 모음 단위로 분리되는 경우가 있습니다. 이 도구는 흩어진 자음과 모음(ㅇㅏㄴㄴㅕㅇ)을 원래의 완성된 한글(안녕)로 다시 조합해줍니다.",
        },
        {
          question: "What is a Jamo Composer?",
          answer:
            "Korean characters (Hangul) are sometimes split into individual consonants and vowels (Jamo) during copy-paste operations. A Jamo Composer reassembles these scattered pieces back into complete Hangul characters. For example, 'ㅇㅏㄴㄴㅕㅇ' becomes '안녕'.",
        },
        {
          question: "Can it also decompose Hangul into Jamo?",
          answer:
            "Yes, it supports both directions. You can compose separated Jamo into complete Hangul (ㅇㅏㄴㄴㅕㅇ → 안녕), or decompose complete Hangul into individual Jamo (안녕 → ㅇㅏㄴㄴㅕㅇ). This is useful for Korean language learning and linguistic analysis.",
        },
      ]}
    >
      {children}
    </JsonLdLayout>
  );
}
