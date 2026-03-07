import { Metadata } from "next";

export const metadata: Metadata = {
  title: "글자수 세기 - 실시간 글자수 카운터 | ToolPick",
  description:
    "자소서, 블로그, SNS 글자수를 실시간으로 세어보세요. 공백 포함/제외, 단어 수, 바이트 수까지 한번에 확인할 수 있습니다.",
};

export default function CharCountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
