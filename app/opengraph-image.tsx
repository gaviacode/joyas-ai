import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage({ params }: { params?: { locale?: string } }) {
  const locale = params?.locale;
  const tagline =
    locale === "en"
      ? "Your AI jeweler for better choices"
      : locale === "pt-br"
        ? "Seu joalheiro IA para escolher melhor"
        : "Tu joyero IA para elegir mejor";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #fffaf1 0%, #f4e4c4 52%, #17120b 100%)",
          color: "#17120b",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 86, fontWeight: 700, letterSpacing: 0 }}>
          joyas<span style={{ color: "#b8872f" }}>.ai</span>
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 720,
            fontSize: 44,
            lineHeight: 1.15,
            color: "#2b241f",
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            marginTop: 46,
            display: "flex",
            width: 220,
            height: 4,
            background: "#b8872f",
          }}
        />
      </div>
    ),
    size,
  );
}
