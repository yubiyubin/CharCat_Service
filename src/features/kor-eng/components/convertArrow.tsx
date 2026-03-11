export default function ConvertArrow() {
  return (
    <svg className="w-8 h-6" viewBox="44 8 36 24" fill="none">
      {/* 위 화살표 (→) */}
      <path
        d="M50 14H80"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M80 14L74 10M80 14L74 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 아래 화살표 (←) */}
      <path
        d="M50 26H80"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 26L56 22M50 26L56 30"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
