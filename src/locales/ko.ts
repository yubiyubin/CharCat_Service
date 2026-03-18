export const ko = {
  header: {
    charCount: "글자수 세기",
    korEng: "한영 변환",
    textDiff: "텍스트 비교",
    jamoCompose: "자모 조합/분해기",
  },
  home: {
    heroTitle1: "무료 온라인",
    heroTitle2: "텍스트 도구 모음",
    heroSubtitle:
      "설치나 가입 없이 웹 브라우저에서 즉각 접속 가능한 CharCat으로 문서 작성과 코딩, 학습의 효율을 극대화하세요.",
    feature1Badge: "01 / 문서 최적화",
    feature1Title: "글자수 및 바이트 계산",
    feature1Desc:
      "이력서, 자기소개서, 리포트 작성 시 글자수와 바이트를 실시간으로 정확하게 세어 공백 포함 및 제외 결과를 직관적으로 안내합니다.",
    feature2Badge: "02 / 오류 복구",
    feature2Title: "한영 오타 및 자소 수정",
    feature2Desc:
      "키보드 입력 실수로 인한 한글/영문 오타를 변환하고, 분리되거나 깨진 자음과 모음을 원래 구조로 완벽하게 조합해 줍니다.",
    feature3Badge: "03 / 분석 대조",
    feature3Title: "두 텍스트 정밀 비교 (Diff)",
    feature3Desc:
      "원본 데이터와 수정된 문서 사이의 추가·삭제된 변경 내용을 글자 단위의 색상으로 시각화합니다. 번역 검수, 코드 리뷰, 약관 변경 사항 추적 등 세밀한 대조가 필요한 작업의 피로도를 낮춰줍니다.",
    pickTool: "필요한 도구를 선택하세요!",
    tools: {
      charCountDesc: "글자수, 단어수, 바이트 수를 실시간으로 세어보세요.",
      korEngDesc: "한영 오타를 자동으로 변환해드립니다.",
      textDiffDesc: "두 텍스트의 차이점을 색상으로 한눈에 비교하세요.",
      jamoComposeDesc: "분리된 자음과 모음을 완성된 글자로 조합해드립니다.",
    },
  },
  common: {
    resultPlaceholder: "변환 결과가 여기에 표시됩니다",
    copyResult: "결과 복사",
    clear: "초기화",
    toast: {
      resultCopied: "변환 결과가 복사되었습니다",
      cleared: "초기화되었습니다",
    },
  },
  charCount: {
    title: "글자수 세기",
    placeholder: "여기에 텍스트를 입력하세요",
    stats: {
      withSpaces: "공백 포함",
      withoutSpaces: "공백 제외",
      words: "단어 수",
      sentences: "문장 수",
      lines: "줄 수",
      bytes: "바이트",
    },
    actions: {
      copy: "텍스트 복사",
      clear: "초기화",
      removeSpaces: "공백 제거",
      removeLineBreaks: "줄바꿈 제거",
    },
    toast: {
      copied: "복사되었습니다.",
      cleared: "초기화되었습니다.",
      spacesRemoved: "공백이 제거되었습니다.",
      lineBreaksRemoved: "줄바꿈이 제거되었습니다.",
    },
    section1Title: "글자수 세기가 필요한 경우",
    section1Items: [
      { label: "자기소개서", limit: "500~1,000자" },
      { label: "블로그 포스팅 (SEO 권장)", limit: "1,500~2,500자" },
      { label: "트위터(X)", limit: "280자" },
      { label: "인스타그램 캡션", limit: "2,200자" },
      { label: "카카오톡 상태메시지", limit: "60자" },
    ],
    section2Title: "바이트 수는 왜 다를까?",
    section2Desc:
      "영문, 숫자, 기본 기호는 1바이트이지만 한글은 UTF-8 기준으로 한 글자당 3바이트를 차지합니다.",
    byteExamples: [
      { label: "A (영문 1글자)", bytes: "1 바이트" },
      { label: "가 (한글 1글자)", bytes: "3 바이트" },
      { label: "안녕하세요 (한글 5글자)", bytes: "15 바이트" },
    ],
  },
  korEng: {
    title: "한영 변환기",
    labelKor: "한글",
    labelEng: "영문",
    placeholderKorToEng:
      "한글로 잘못 입력한 텍스트를 붙여넣으세요 (예: ㅗ디ㅣㅐ)",
    placeholderEngToKor:
      "영문으로 잘못 입력한 텍스트를 붙여넣으세요 (예: dkssud)",
    sectionTitle: "한영 변환기란?",
    sectionDesc:
      "한영키를 누르지 않고 타이핑해서 영어/한글이 잘못 입력된 경우, 원래 의도했던 한글/영어로 변환해주는 도구입니다.",
    examplesTitle: "변환 예시",
  },
  jamoCompose: {
    titleCompose: "자음 모음 조합기",
    titleDecompose: "자음 모음 분해기",
    labelJamo: "자음/모음",
    labelHangul: "한글",
    placeholderCompose: "분리된 자모를 붙여넣으세요 (예: ㅇㅏㄴㄴㅕㅇ)",
    placeholderDecompose: "한글을 자모로 분해하세요 (예: 안녕)",
    sectionTitle: "자음/모음 합치기란?",
    sectionDesc:
      "복사 붙여넣기 과정에서 한글이 자음과 모음 단위로 분리되는 경우가 있습니다. 이 도구는 흩어진 자음과 모음을 원래의 완성된 한글로 다시 조합해줍니다.",
    examplesTitle: "변환 예시",
  },
  textDiff: {
    title: "텍스트 비교",
    labelOriginal: "원본 텍스트",
    labelModified: "수정된 텍스트",
    placeholderOriginal: "원본 텍스트를 입력하세요",
    placeholderModified: "수정된 텍스트를 입력하세요",
    resultPlaceholder:
      "양쪽에 텍스트를 입력하면 차이점이 여기에 표시됩니다",
    resultSame: "두 텍스트가 동일합니다",
    sectionTitle: "텍스트 비교란?",
    sectionDesc:
      "두 텍스트 사이의 차이점을 자동으로 찾아서 색상으로 표시해주는 도구입니다.\n원본에서 삭제된 부분은 빨간색으로, 새로 추가된 부분은 초록색으로 표시됩니다.",
    useCasesTitle: "이런 때 유용해요!",
    useCases: [
      "코드 리뷰에서 변경 사항 확인",
      "문서 수정 시 변경 사항 추적",
      "학술 논문에서 수정 사항 비교",
      "번역문과 원문 대조",
      "계약서, 약관 변경 사항 파악",
    ],
  },
};
