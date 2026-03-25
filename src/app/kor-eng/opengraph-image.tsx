import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "한영 변환기 · Korean-English Converter - CharCat";
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
            <span style={{ fontSize: 80 }}>🔄</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 54, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.1 }}>
                한영 변환기
              </span>
              <span style={{ fontSize: 28, color: "#7c3aed", fontWeight: 600 }}>
                Korean-English Converter
              </span>
            </div>
          </div>
          <p style={{ fontSize: 26, color: "#6b7280", margin: 0 }}>
            dkssud → 안녕 · ㅗ디ㅣㅐ → hello · 한영키 오타 즉시 변환
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 20, color: "#7c3aed", fontWeight: 600 }}>charcat.cyb-labs.com/kor-eng</span>
          <span style={{ fontSize: 18, color: "#9ca3af" }}>무료 · 설치 불필요</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
