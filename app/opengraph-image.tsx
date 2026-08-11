import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#fffdf8",
          color: "#25211d",
          padding: "54px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            background:
              "radial-gradient(circle at top left, rgba(178,139,73,0.18), transparent 28%), radial-gradient(circle at top right, rgba(180,106,96,0.10), transparent 24%)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            borderRadius: "36px",
            overflow: "hidden",
            border: "1px solid rgba(52,77,56,0.12)",
            background: "rgba(255,255,255,0.72)",
          }}
        >
          <div
            style={{
              width: "31%",
              background: "#344d38",
              padding: "42px 34px",
              color: "#fffdf8",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              A creative journal by Liv
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 44,
                  border: "3px solid rgba(255,255,255,0.28)",
                }}
              />
              <div
                style={{
                  width: 120,
                  height: 3,
                  background: "#d1b471",
                  transform: "rotate(-26deg)",
                }}
              />
            </div>
          </div>
          <div
            style={{
              width: "69%",
              padding: "58px 58px 52px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#7b3f39",
              }}
            >
              Threaded Olive
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 74,
                lineHeight: 1.02,
                color: "#203126",
              }}
            >
              <span>Things I make, wear,</span>
              <span>read &amp; love.</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.4,
                fontFamily: "sans-serif",
                color: "#5b534b",
              }}
            >
              {siteConfig.description}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
