import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://charcat.cyb-labs.com"),
  title: "CharCat - Free Online Text Tools · 무료 온라인 텍스트 도구",
  description:
    "Free online text tools: character counter, text diff checker, Korean-English converter & more. 글자수 세기, 텍스트 비교, 한영 변환 등 무료 텍스트 도구를 설치 없이 사용하세요.",
  keywords: [
    "글자수 세기",
    "한영 변환",
    "텍스트 도구",
    "글자수 카운터",
    "텍스트 비교",
    "character counter",
    "text diff checker",
    "online text tools",
    "free text tools",
    "korean english converter",
  ],
  openGraph: {
    type: "website",
    siteName: "CharCat",
    title: "CharCat - 무료 온라인 텍스트 도구",
    description:
      "글자수 세기, 텍스트 비교, 한영 변환 등 무료 텍스트 도구를 설치 없이 사용하세요.",
    url: "https://charcat.cyb-labs.com",
    locale: "ko_KR",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "CharCat - 무료 온라인 텍스트 도구",
    description:
      "글자수 세기, 텍스트 비교, 한영 변환 등 무료 텍스트 도구를 설치 없이 사용하세요.",
    images: [],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "rBhNrr7WAhxWSwWEnD7orcp4eYNTIgkF2-2-XqqStjM",
  },
  alternates: {
    canonical: "https://charcat.cyb-labs.com",
    languages: {
      ko: "https://charcat.cyb-labs.com",
      en: "https://charcat.cyb-labs.com",
    },
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
        <meta
          name="naver-site-verification"
          content="b3789da6217c590f0fb2a27d524f7e591d089c64"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CharCat",
              alternateName: "CharCat 텍스트 도구",
              url: "https://charcat.cyb-labs.com",
              description:
                "글자수 세기, 한영 변환, 텍스트 비교, 자모 조합, 대소문자 변환, 이모티콘 복사. 무료 온라인 텍스트 도구 모음.",
              inLanguage: ["ko", "en"],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://charcat.cyb-labs.com/emoji?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
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
