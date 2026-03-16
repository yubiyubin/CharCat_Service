export default function Logo() {
  return (
    <svg viewBox="0 0 230 52" width="230" height="52">
      <style>{`
        .logo-tool { fill: var(--c-text-primary); }
        .logo-pick { fill: var(--c-primary-dark); }
        .logo-underline-light { fill: var(--c-primary-light); opacity: 0.5; }
        .logo-underline-bold { fill: var(--c-primary-dark); }
      `}</style>
      <text
        x="8"
        y="34"
        fontFamily="'Segoe UI', system-ui, sans-serif"
        fontSize="28"
        fontWeight="700"
      >
        <tspan className="logo-tool">Tool</tspan>
        <tspan className="logo-pick">Pick</tspan>
      </text>
      <rect x="8" y="39" width="54" height="3" rx="1.5" className="logo-underline-light" />
      <rect x="62" y="39" width="54" height="3" rx="1.5" className="logo-underline-bold" />
    </svg>
  );
}
