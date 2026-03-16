import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageButton() {
  const { language, setLanguage } = useLanguage();
  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };
  return (
    <button
      onClick={toggleLanguage}
      className="md:ml-2 px-3 py-1 rounded-full bg-surface-muted border border-border-input text-text-secondary text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {language === "ko" ? "EN" : "한국어"}
    </button>
  );
}
