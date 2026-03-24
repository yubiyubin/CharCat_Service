import type { Metadata } from "next";
import JsonLdLayout from "@/components/JsonLdLayout";

export const metadata: Metadata = {
  title:
    "대소문자 변환 · Case Converter | UPPER · lower · Title · camelCase · snake_case - CharCat",
  description:
    "Free online case converter. Transform text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more. 영문 대소문자를 다양한 형식으로 즉시 변환하는 무료 온라인 도구.",
  keywords: [
    "대소문자 변환",
    "대문자 변환",
    "소문자 변환",
    "영어 대문자",
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "camelCase converter",
    "snake_case converter",
    "kebab-case converter",
    "text case changer",
    "capitalize text",
    "free case converter",
  ],
  alternates: {
    canonical: "/case-convert",
  },
};

const BASE_URL = "https://charcat.vercel.app";

export default function CaseConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JsonLdLayout
      name="CharCat Case Converter"
      alternateName="CharCat 대소문자 변환"
      url={`${BASE_URL}/case-convert`}
      description="Free online tool to convert text case to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE."
      faqs={[
        {
          question: "대소문자 변환기란 무엇인가요?",
          answer:
            "영문 텍스트의 대소문자를 다양한 형식으로 변환하는 도구입니다. 문서 작성 시 제목 형식(Title Case)으로 바꾸거나, 프로그래밍에서 변수 이름을 camelCase, snake_case 등으로 변환할 때 유용합니다.",
        },
        {
          question: "What is a Case Converter?",
          answer:
            "A case converter transforms the letter casing of text into various formats. Common conversions include UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case. It's essential for writing, editing, and programming.",
        },
        {
          question: "What is the difference between camelCase, snake_case, and kebab-case?",
          answer:
            "camelCase joins words with no separator, capitalizing each word except the first (e.g., helloWorld). snake_case uses underscores between lowercase words (e.g., hello_world). kebab-case uses hyphens between lowercase words (e.g., hello-world). These are common naming conventions in programming.",
        },
        {
          question: "Title Case와 Sentence case의 차이는?",
          answer:
            "Title Case는 모든 단어의 첫 글자를 대문자로 변환합니다 (예: Hello World). Sentence case는 문장의 첫 글자만 대문자로 변환합니다 (예: Hello world). 제목에는 Title Case, 본문에는 Sentence case가 적합합니다.",
        },
      ]}
    >
      {children}
    </JsonLdLayout>
  );
}
