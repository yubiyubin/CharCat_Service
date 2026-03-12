import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "텍스트 비교 - 두 텍스트 차이점 비교 | ToolPick",
  description:
    "두 텍스트를 붙여넣으면 차이점을 색상으로 한눈에 비교할 수 있습니다. 코드 리뷰, 문서 수정 확인에 유용합니다.",
};

export default function TextDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
