import type { Metadata } from "next";
import JsonLdLayout from "@/components/JsonLdLayout";

export const metadata: Metadata = {
  title:
    "이모티콘 · 특수문자 모음 · Emoji & Symbol Picker | 클릭 복사 - CharCat",
  description:
    "Free emoji and special character picker with search. Find and copy emojis, symbols, arrows, hearts, flags and more with a single click. 이모티콘, 특수문자, 기호를 검색하고 클릭 한 번으로 복사하세요. 1,500개+ 이모지 지원.",
  keywords: [
    "이모티콘 복사",
    "이모티콘 모음",
    "이모티콘 검색",
    "특수문자 모음",
    "특수문자 복사",
    "특수문자 검색",
    "특수기호",
    "국기 이모티콘",
    "emoji copy",
    "emoji picker",
    "emoji search",
    "special characters",
    "symbol copy",
    "text symbols",
    "emoji keyboard",
    "copy paste emoji",
    "flag emoji",
  ],
  alternates: {
    canonical: "/emoji",
  },
};

const BASE_URL = "https://charcat.vercel.app";

export default function EmojiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JsonLdLayout
      name="CharCat Emoji & Symbol Picker"
      alternateName="CharCat 이모티콘 특수문자 모음"
      url={`${BASE_URL}/emoji`}
      description="Free online tool to search, browse and copy 1,500+ emojis, special characters, and symbols organized by 13 categories."
      faqs={[
        {
          question: "이모티콘를 어떻게 복사하나요?",
          answer:
            "원하는 이모티콘를 클릭하면 자동으로 클립보드에 복사됩니다. 이후 Ctrl+V (Mac: Cmd+V)로 어디에든 붙여넣을 수 있습니다.",
        },
        {
          question: "How do I copy an emoji?",
          answer:
            "Simply click on any emoji or symbol and it will be automatically copied to your clipboard. Then paste it anywhere with Ctrl+V (or Cmd+V on Mac).",
        },
        {
          question: "이모티콘을 검색할 수 있나요?",
          answer:
            "네, 상단 검색창에 한국어 또는 영어로 키워드를 입력하면 전체 카테고리에서 관련 이모티콘을 찾아줍니다. 예: '하트', '고양이', 'smile', 'korea' 등으로 검색할 수 있습니다.",
        },
        {
          question: "Can I search for emojis?",
          answer:
            "Yes, use the search bar at the top to find emojis by keyword in Korean or English. For example, search 'heart', 'cat', 'smile', or 'korea' to find related emojis across all categories.",
        },
        {
          question: "특수문자와 이모티콘의 차이는 무엇인가요?",
          answer:
            "이모티콘는 그림 형태의 유니코드 문자(😀, ❤️)이고, 특수문자는 수학 기호(∞, √), 화살표(→, ⇒), 별(★, ✦) 등 텍스트 기반의 기호입니다. 둘 다 유니코드 표준으로 대부분의 기기에서 지원됩니다.",
        },
      ]}
    >
      {children}
    </JsonLdLayout>
  );
}
