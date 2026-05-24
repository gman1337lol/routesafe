import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20
      }}
    >
      
      <p>RouteSafe</p>

      <Link href="/schedule">
        <button
          style={{
            padding: 12,
            backgroundColor: "lime",
            color: "black",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Schedule A Ride
        </button>
      </Link>

      <Link href="/about">
  <button
    style={{
      padding: 12,
      backgroundColor: "lime",
      color: "black",
      border: "none",
      borderRadius: 8,
      cursor: "pointer"
    }}
  >
    About
  </button>
</Link>
    </main>
  );
}