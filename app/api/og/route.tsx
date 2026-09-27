import { ImageResponse } from "next/og";

export const runtime = "nodejs";

// Hex values per brief: OG images render outside the token system (no CSS vars available).
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Digital Chautari";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#0B1220",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 88,
            height: 88,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 22,
            background: "linear-gradient(135deg, #0F9488, #0B6F66)",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          DC
        </div>
        <div
          style={{
            color: "#E0A930",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Digital Chautari
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ width: 120, height: 8, borderRadius: 4, backgroundColor: "#E0A930" }} />
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
          {title}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
