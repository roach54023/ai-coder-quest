import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rank = searchParams.get("rank") || "IT文盲";
  const name = searchParams.get("name") || "匿名冒险者";
  const color = searchParams.get("color") || "#9CA3AF";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              color: "#666",
              marginBottom: "20px",
            }}
          >
            AI Coder Quest
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: color,
              marginBottom: "10px",
            }}
          >
            {rank}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#999",
            }}
          >
            {name}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
