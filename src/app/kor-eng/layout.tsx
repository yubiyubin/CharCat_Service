import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "한영 변환기 - 한영 오타 변환 | CharCat",
  description:
    "영문으로 잘못 입력한 한글을 자동으로 변환해드립니다. dkssud → 안녕, 한영 오타를 쉽게 고치세요.",
};

export default function HanEngLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
