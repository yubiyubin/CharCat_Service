export default function TextLogo() {
  return (
    <svg viewBox="7 6 125 40" className="h-[36px] md:h-[48px] w-auto block">
      <style>{`
        .logo-tool { fill: var(--c-text-primary); }
        .logo-pick { fill: var(--c-primary-dark); }
        .logo-underline-light { fill: var(--c-primary-light); opacity: 0.5; }
        .logo-underline-bold { fill: var(--c-primary-dark); }
      `}</style>
      <text
        x="14"
        y="34"
        fontFamily="'Segoe UI', system-ui, sans-serif"
        fontSize="28"
        fontWeight="700"
      >
        <tspan className="logo-tool">Char</tspan>
      </text>

      <foreignObject x="75" y="3.5" width="28" height="36">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "var(--c-primary-dark)",
            WebkitMaskImage: "url(/logo-cat.png)",
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskImage: "url(/logo-cat.png)",
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
          }}
        />
      </foreignObject>

      <text
        x="96"
        y="34"
        fontFamily="'Segoe UI', system-ui, sans-serif"
        fontSize="28"
        fontWeight="700"
      >
        <tspan className="logo-pick">at</tspan>
      </text>

      <rect
        x="14"
        y="39"
        width="62"
        height="3"
        rx="1.5"
        className="logo-underline-light"
      />
      <rect
        x="74"
        y="39"
        width="47"
        height="3"
        rx="1.5"
        className="logo-underline-bold"
      />
    </svg>
  );
}
