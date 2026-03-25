import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CharCat - 무료 온라인 텍스트 도구";
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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#7c3aed", letterSpacing: "-0.5px" }}>
            CharCat
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 72 }}>🐱</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 52, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.1 }}>
                무료 온라인 텍스트 도구
              </span>
              <span style={{ fontSize: 26, color: "#6b7280" }}>
                Free Online Text Tools
              </span>
            </div>
          </div>
          <p style={{ fontSize: 24, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
            글자수 세기 · 한영 변환 · 텍스트 비교 · 자모 조합 · 대소문자 변환 · 이모티콘
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 20, color: "#7c3aed", fontWeight: 600 }}>
            charcat.cyb-labs.com
          </span>
          <span style={{ fontSize: 18, color: "#9ca3af" }}>설치 불필요 · 무료</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
