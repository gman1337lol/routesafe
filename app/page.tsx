"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        textAlign: "center",
        padding: 20,
      }}
    >
      <h1 style={{ color: "#00ff66", fontSize: 48 }}>RouteSafe</h1>

      <p style={{ maxWidth: 400, color: "#aaa" }}>
        Safe, simple ride scheduling. Built for real-world dispatch.
      </p>

      {/* BUTTON 1 */}
      <button
        onClick={() => router.push("/schedule")}
        style={buttonStyle}
      >
        Schedule a Ride
      </button>

      {/* BUTTON 2 */}
      <button
        onClick={() => router.push("/about")}
        style={buttonStyle}
      >
        About
      </button>
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  width: 220,
  padding: 14,
  borderRadius: 10,
  border: "2px solid #00ff66",
  backgroundColor: "black",
  color: "#00ff66",
  fontWeight: "bold",
  cursor: "pointer",
};