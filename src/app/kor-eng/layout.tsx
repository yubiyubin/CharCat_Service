import type { Metadata } from "next";
import JsonLdLayout from "@/components/JsonLdLayout";

export const metadata: Metadata = {
  title:
    "한영 변환기 · Korean English Converter | 한영키 오타 자동 변환 - CharCat",
  description:
    "Free Korean-English keyboard typo converter. Automatically fix text typed with the wrong keyboard layout. dkssud → 안녕, ㅗ디ㅣㅐ → hello. 한영키 오타를 자동으로 변환하는 무료 온라인 도구.",
  keywords: [
    "한영 변환",
    "한영 오타 변환",
    "영한 변환",
    "한영키 오타",
    "한글 영어 변환",
    "korean english converter",
    "korean keyboard converter",
    "korean typo fixer",
    "hangul to english",
    "english to korean",
    "keyboard layout converter",
    "wrong keyboard language fix",
  ],
  alternates: {
    canonical: "/kor-eng",
    languages: {
      ko: "https://charcat.cyb-labs.com/kor-eng",
      en: "https://charcat.cyb-labs.com/kor-eng",
    },
  },
};

const BASE_URL = "https://charcat.cyb-labs.com";

export default function HanEngLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JsonLdLayout
      name="CharCat Korean-English Converter"
      alternateName="CharCat 한영 변환기"
      url={`${BASE_URL}/kor-eng`}
      breadcrumbLabel="한영 변환"
      description="Free online tool that converts text typed with the wrong Korean/English keyboard layout back to the intended language."
      faqs={[
        {
          question: "한영 변환기란 무엇인가요?",
          answer:
            "한영키를 누르지 않고 타이핑해서 영어/한글이 잘못 입력된 경우, 원래 의도했던 한글 또는 영어로 변환해주는 도구입니다. 예를 들어 'dkssud'를 '안녕'으로 변환합니다.",
        },
        {
          question: "What is a Korean-English keyboard converter?",
          answer:
            "It's a tool that fixes text typed with the wrong keyboard layout. If you accidentally typed in Korean mode when you meant to type English (or vice versa), this converter transforms the text back to what you originally intended. For example, 'dkssud' becomes '안녕' and 'ㅗ디ㅣㅐ' becomes 'hello'.",
        },
        {
          question: "Can it convert in both directions?",
          answer:
            "Yes, it supports bidirectional conversion. English → Korean (dkssud → 안녕) and Korean → English (ㅗ디ㅣㅐ → hello) are both supported with a single click to switch direction.",
        },
      ]}
    >
      {children}
    </JsonLdLayout>
  );
}
