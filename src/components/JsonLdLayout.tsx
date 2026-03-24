import { ReactNode } from "react";

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
}

export default function JsonLdLayout({
  children,
  name,
  alternateName,
  url,
  description,
  faqs,
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
