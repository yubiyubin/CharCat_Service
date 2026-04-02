export const ROOT_STRUCTURED_DATA = {
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
};
