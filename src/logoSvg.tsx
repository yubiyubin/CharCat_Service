export default function Logo() {
  return (
    <svg viewBox="0 0 230 52" width="230" height="52">
      <text
        x="8"
        y="34"
        fontFamily="'Segoe UI', system-ui, sans-serif"
        fontSize="28"
        fontWeight="700"
        fill="#1f2937"
      >
        <tspan className="tool-text">Tool</tspan>
        <tspan className="pick-text" fill="#8041bc">
          Pick
        </tspan>
      </text>
      <rect
        className="tool-underline"
        x="9"
        y="39"
        width="70"
        height="3"
        rx="1.5"
        fill="#e9d5ff"
      />
      <rect
        className="underline"
        x="61"
        y="39"
        width="57"
        height="3"
        rx="1.5"
        fill="#8041bc"
      />
    </svg>
  );
}
