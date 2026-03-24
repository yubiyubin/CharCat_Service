import type { Metadata } from "next";
import JsonLdLayout from "@/components/JsonLdLayout";

export const metadata: Metadata = {
  title:
    "텍스트 비교 · Text Diff Checker | 두 텍스트 차이점 비교 - CharCat",
  description:
    "Free online text diff checker. Compare two texts and visualize additions and deletions with color highlighting. 두 텍스트의 차이점을 글자 단위 색상으로 시각화. 코드 리뷰, 문서 비교, 번역 검수에 최적화된 무료 도구.",
  keywords: [
    "텍스트 비교",
    "텍스트 차이점 비교",
    "diff 검사기",
    "문서 비교",
    "코드 비교",
    "text diff",
    "text compare",
    "diff checker",
    "text difference",
    "compare two texts",
    "online diff tool",
    "text comparison tool",
    "code diff",
    "document compare",
  ],
  alternates: {
    canonical: "/text-diff",
  },
};

const BASE_URL = "https://charcat.vercel.app";

export default function TextDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JsonLdLayout
      name="CharCat Text Diff Checker"
      alternateName="CharCat 텍스트 비교"
      url={`${BASE_URL}/text-diff`}
      description="Free online tool that compares two texts and highlights differences at the character level with color coding."
      faqs={[
        {
          question: "텍스트 비교는 어떤 방식으로 작동하나요?",
          answer:
            "글자 단위(character-level) diff 알고리즘으로 원본과 수정본을 비교합니다. 삭제된 부분은 빨간색, 추가된 부분은 초록색으로 표시되어 변경 사항을 한눈에 파악할 수 있습니다.",
        },
        {
          question: "How does the text diff checker work?",
          answer:
            "It uses a character-level diff algorithm to compare the original and modified texts. Deleted parts are highlighted in red, and added parts are highlighted in green, making it easy to spot every change at a glance.",
        },
        {
          question: "What can I use a text diff checker for?",
          answer:
            "Text diff checkers are useful for code reviews, tracking document revisions, comparing academic paper edits, contrasting translations with originals, and identifying changes in contracts or terms of service.",
        },
        {
          question: "어떤 경우에 텍스트 비교가 유용한가요?",
          answer:
            "코드 리뷰에서 변경 사항 확인, 문서 수정 추적, 학술 논문 수정 비교, 번역문과 원문 대조, 계약서·약관 변경 사항 파악 등에 활용됩니다.",
        },
      ]}
    >
      {children}
    </JsonLdLayout>
  );
}
