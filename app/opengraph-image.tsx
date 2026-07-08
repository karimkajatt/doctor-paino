import { ImageResponse } from "next/og";
import { CONTACT } from "@/lib/data/contact";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #05121e, #0b3d62)",
          color: "#fff",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1d6fa5, #2a9d9b)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            marginBottom: 36,
          }}
        >
          JP
        </div>
        <div style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.15, display: "flex" }}>
          {CONTACT.doctorFullName}
        </div>
        <div style={{ fontSize: 30, color: "#cfe0ec", marginTop: 18, display: "flex", fontFamily: "sans-serif" }}>
          Neurocirujano en Lima · Columna, cerebro y manejo del dolor
        </div>
      </div>
    ),
    size
  );
}
