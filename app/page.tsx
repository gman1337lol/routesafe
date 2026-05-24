import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20
      }}
    >
      
      <p>Welcome to RouteSafe</p>

      <Link href="/schedule">
        <button
          style={{
            padding: 12,
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Schedule A Ride
        </button>
      </Link>
    </main>
  );
}