import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ToolPick - 온라인 텍스트 도구 모음",
  description:
    "글자수 세기, 한영 변환, 텍스트 비교 등 유용한 텍스트 도구를 무료로 사용하세요.",
  keywords: ["글자수 세기", "한영 변환", "텍스트 도구", "글자수 카운터"],
  verification: {
    google: "rBhNrr7WAhxWSwWEnD7orcp4eYNTIgkF2-2-XqqStjM",
  },
};

import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <head>
        <meta
          name="naver-site-verification"
          content="ea9322a414becac2d0089b3e3f990f8116cb2aae"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BEMRGMHDPD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BEMRGMHDPD');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
