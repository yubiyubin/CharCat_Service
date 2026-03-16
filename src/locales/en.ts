export const en = {
  header: {
    charCount: "Character Count",
    korEng: "Ko-En Converter",
    textDiff: "Text Diff Checker",
    jamoCompose: "Jamo Composer",
  },
  home: {
    heroTitle1: "Free Online",
    heroTitle2: "Text Tool Suite",
    heroSubtitle:
      "Maximize your document writing, coding, and learning efficiency with ToolPick—accessible instantly from your web browser with no installation or sign-up required.",
    feature1Badge: "01 / Document Optimization",
    feature1Title: "Character & Byte Calculation",
    feature1Desc:
      "Accurately compute character and byte counts in real time for resumes, cover letters, and reports, providing intuitive results with and without spaces.",
    feature2Badge: "02 / Error Recovery",
    feature2Title: "Typo & Jamo Correction",
    feature2Desc:
      "Convert English/Korean typos caused by keyboard input errors, and perfectly assemble separated or broken Korean Jamo structures into their original complete forms.",
    feature3Badge: "03 / Analysis & Comparison",
    feature3Title: "Precision Text Diff",
    feature3Desc:
      "Visualize added and deleted modifications between original data and revised documents using character-level color highlighting. Essential for translation review, code review, and tracking updates in terms and contracts.",
    pickTool: "Pick the tool you need!",
    tools: {
      charCountDesc: "Count characters, words, and bytes in real-time.",
      korEngDesc: "Automatically convert English-Korean keyboard typos.",
      textDiffDesc: "Instantly compare the differences between two texts.",
      jamoComposeDesc:
        "Assemble separated Korean consonants and vowels into complete characters.",
    },
  },
  common: {
    resultPlaceholder: "Result will appear here",
    copyResult: "Copy Result",
    clear: "Clear",
    toast: {
      resultCopied: "Result copied",
      cleared: "Cleared",
    },
  },
  charCount: {
    title: "Character Count",
    placeholder: "Enter text here",
    stats: {
      withSpaces: "With Spaces",
      withoutSpaces: "Without Spaces",
      words: "Words",
      sentences: "Sentences",
      lines: "Lines",
      bytes: "Bytes",
    },
    actions: {
      copy: "Copy Text",
      clear: "Clear",
      removeSpaces: "Remove Spaces",
      removeLineBreaks: "Remove Line Breaks",
    },
    toast: {
      copied: "Copied.",
      cleared: "Cleared.",
      spacesRemoved: "Spaces removed.",
      lineBreaksRemoved: "Line breaks removed.",
    },
    section1Title: "When You Need Character Count",
    section1Items: [
      { label: "Personal Statement", limit: "500–1,000 chars" },
      { label: "Blog Post (SEO recommended)", limit: "1,500–2,500 chars" },
      { label: "Twitter (X)", limit: "280 chars" },
      { label: "Instagram Caption", limit: "2,200 chars" },
      { label: "KakaoTalk Status", limit: "60 chars" },
    ],
    section2Title: "Why Are Byte Counts Different?",
    section2Desc:
      "English letters, numbers, and basic symbols are 1 byte each, while Korean characters take 3 bytes each in UTF-8 encoding.",
    byteExamples: [
      { label: "A (1 English char)", bytes: "1 byte" },
      { label: "가 (1 Korean char)", bytes: "3 bytes" },
      { label: "안녕하세요 (5 Korean chars)", bytes: "15 bytes" },
    ],
  },
  korEng: {
    title: "Ko-En Converter",
    labelKor: "Korean",
    labelEng: "English",
    placeholderKorToEng:
      "Paste Korean-typed text (e.g. hello → ㅗ디ㅣㅐ)",
    placeholderEngToKor:
      "Paste English-typed text (e.g. 안녕 → dkssud)",
    sectionTitle: "What is Ko-En Converter?",
    sectionDesc:
      "A tool that converts text accidentally typed in the wrong language back to the intended Korean or English.",
    examplesTitle: "Examples",
  },
  jamoCompose: {
    titleCompose: "Jamo Composer",
    titleDecompose: "Jamo Decomposer",
    labelJamo: "Jamo",
    labelHangul: "Hangul",
    placeholderCompose:
      "Paste separated Jamo (e.g. ㅇㅏㄴㄴㅕㅇ)",
    placeholderDecompose: "Enter Hangul to decompose (e.g. 안녕)",
    sectionTitle: "What is Jamo Composer?",
    sectionDesc:
      "Korean characters sometimes get split into individual consonants and vowels during copy-paste. This tool reassembles scattered Jamo back into complete Hangul characters.",
    examplesTitle: "Examples",
  },
  textDiff: {
    title: "Text Diff",
    labelOriginal: "Original",
    labelModified: "Modified",
    placeholderOriginal: "Enter original text",
    placeholderModified: "Enter modified text",
    resultPlaceholder: "Enter text on both sides to see differences",
    resultSame: "The two texts are identical",
    sectionTitle: "What is Text Diff?",
    sectionDesc:
      "A tool that automatically finds and highlights differences between two texts.\nDeleted text is shown in red, added text is shown in green.",
    useCasesTitle: "Useful for:",
    useCases: [
      "Checking changes in code reviews",
      "Tracking modifications in documents",
      "Comparing revisions in academic papers",
      "Contrasting translations with originals",
      "Identifying contract or terms updates",
    ],
  },
};
