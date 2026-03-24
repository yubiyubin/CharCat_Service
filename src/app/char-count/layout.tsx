import { Metadata } from "next";
import JsonLdLayout from "@/components/JsonLdLayout";

export const metadata: Metadata = {
  title:
    "글자수 세기 · Character Counter | 공백 포함/제외 · 단어수 · 바이트 계산 - CharCat",
  description:
    "Free online character counter. Count characters (with/without spaces), words, sentences, lines, and bytes in real-time. 글자수 세기, 공백 제외 글자수, 단어수, 바이트 계산을 실시간으로 한번에. 자소서·블로그·SNS 글자수 제한 확인에 최적화.",
  keywords: [
    "글자수 세기",
    "글자수 카운터",
    "공백 포함 글자수",
    "공백 제외 글자수",
    "단어수 세기",
    "문장수 세기",
    "바이트 계산",
    "자소서 글자수",
    "character count",
    "character counter",
    "word count",
    "word counter online",
    "letter count",
    "byte counter",
    "sentence counter",
    "line counter",
    "text counter",
    "free character counter",
  ],
  alternates: {
    canonical: "/char-count",
  },
};

const BASE_URL = "https://charcat.vercel.app";

export default function CharCountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JsonLdLayout
      name="CharCat Character Counter"
      alternateName="CharCat 글자수 세기"
      url={`${BASE_URL}/char-count`}
      description="Free online tool to count characters, words, sentences, lines, and bytes in real-time. Supports both Korean and English."
      faqs={[
        {
          question: "공백 포함 글자수와 공백 제외 글자수의 차이는?",
          answer:
            "공백 포함 글자수는 띄어쓰기·탭·줄바꿈을 모두 포함한 전체 문자 수이고, 공백 제외 글자수는 이를 제외한 순수 문자 수입니다. 자기소개서나 에세이는 보통 공백 포함 기준입니다.",
        },
        {
          question: "What is the difference between characters with and without spaces?",
          answer:
            "Characters with spaces counts every character including spaces, tabs, and line breaks. Characters without spaces excludes all whitespace, giving you the pure character count. Most social media platforms count with spaces.",
        },
        {
          question: "한글과 영문의 바이트 수가 다른 이유는?",
          answer:
            "UTF-8 인코딩에서 영문·숫자·기본 기호는 1바이트, 한글은 한 글자당 3바이트를 차지합니다. 예를 들어 '안녕하세요'는 5글자이지만 15바이트입니다.",
        },
        {
          question: "Why are byte counts different from character counts?",
          answer:
            "In UTF-8 encoding, English letters and basic symbols take 1 byte each, while Korean characters take 3 bytes each. For example, 'hello' is 5 characters and 5 bytes, but '안녕하세요' is 5 characters and 15 bytes.",
        },
        {
          question: "How are words counted?",
          answer:
            "Words are counted by splitting text on whitespace characters (spaces, tabs, line breaks). This method works consistently for both Korean and English text.",
        },
      ]}
    >
      {children}
    </JsonLdLayout>
  );
}
