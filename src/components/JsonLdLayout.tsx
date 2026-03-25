import { ReactNode } from "react";

const SITE_URL = "https://charcat.cyb-labs.com";

interface FAQ {
  question: string;
  answer: string;
}

interface JsonLdLayoutProps {
  children: ReactNode;
  name: string;
  alternateName: string;
  url: string;
  description: string;
  faqs: FAQ[];
  /** BreadcrumbList에 표시할 한국어 페이지 이름 */
  breadcrumbLabel: string;
}

export default function JsonLdLayout({
  children,
  name,
  alternateName,
  url,
  description,
  faqs,
  breadcrumbLabel,
}: JsonLdLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name,
        alternateName,
        url,
        applicationCategory: "UtilityApplication",
        operatingSystem: "All",
        inLanguage: ["ko", "en"],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "CharCat",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbLabel,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
