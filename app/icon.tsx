import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d6fa5, #2a9d9b)",
          borderRadius: "50%",
          color: "#fff",
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "sans-serif",
        }}
      >
        JP
      </div>
    ),
    size
  );
}
