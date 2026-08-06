import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#FCFAF7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative amber circle */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,120,44,0.12), transparent 70%)",
          }}
        />

        {/* Initial */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 32,
            background: "#C8782C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 56,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          А
        </div>

        {/* Name */}
        <p
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#1A1B1E",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Алексей Чеголин
        </p>

        {/* Role */}
        <p
          style={{
            fontSize: 28,
            color: "#C8782C",
            margin: "12px 0 0",
            fontWeight: 500,
          }}
        >
          Таргетолог · Яндекс.Директ & VK Реклама
        </p>

        {/* Tagline */}
        <p
          style={{
            fontSize: 18,
            color: "#5C5A55",
            margin: "16px 0 0",
          }}
        >
          Привожу целевые лиды из рекламы. Без слива бюджета.
        </p>
      </div>
    ),
    { ...size }
  );
}
