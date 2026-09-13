import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FBF7F1",
          backgroundImage: "radial-gradient(circle at 25% 20%, #DDE5D6 0%, #FBF7F1 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "#8A9E83",
            }}
          />
          <div style={{ fontSize: 84, color: "#3A2630", fontFamily: "serif" }}>{SITE.name}</div>
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#59404C", fontStyle: "italic" }}>
          {SITE.tagline}
        </div>
        <div style={{ marginTop: 40, fontSize: 22, color: "#59404C", maxWidth: 780, textAlign: "center" }}>
          Healing experts · Meditation · Healing crystals
        </div>
      </div>
    ),
    { ...size }
  );
}
