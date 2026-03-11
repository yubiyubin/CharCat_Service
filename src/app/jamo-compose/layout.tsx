import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자음/모음 합치기 - 분리된 한글 자음 모음 조합 | ToolPick",
  description:
    "분리된 한글 자음 모음을 완성된 글자로 합쳐드립니다. ㅇㅏㄴㄴㅕㅇ → 안녕, 흩어진 자모를 쉽게 조합하세요.",
};

export default function JamoComposeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
