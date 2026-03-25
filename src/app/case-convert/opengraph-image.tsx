import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "대소문자 변환 · Case Converter - CharCat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f8f7ff 0%, #ede9fe 100%)",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 700, color: "#7c3aed" }}>CharCat</span>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 80, fontFamily: "monospace", fontWeight: 900, color: "#7c3aed" }}>Aa</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 54, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.1 }}>
                대소문자 변환
              </span>
              <span style={{ fontSize: 28, color: "#7c3aed", fontWeight: 600 }}>
                Case Converter
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["UPPER", "lower", "Title", "camelCase", "snake_case", "kebab-case"].map((c) => (
              <span
                key={c}
                style={{ fontSize: 20, fontFamily: "monospace", color: "#7c3aed", background: "#ede9fe", padding: "4px 10px", borderRadius: 6 }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 20, color: "#7c3aed", fontWeight: 600 }}>charcat.cyb-labs.com/case-convert</span>
          <span style={{ fontSize: 18, color: "#9ca3af" }}>무료 · 설치 불필요</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
