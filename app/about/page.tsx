import Link from "next/link";

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <h1>About RouteSafe</h1>

      <p style={{ maxWidth: 700, textAlign: "center", color: "#ccc" }}>
        RouteSafe is a developing ride scheduling platform focused on safe,
        reliable, and simple transportation coordination.
      </p>

      <div style={{ maxWidth: 700 }}>
        <h2>Safety</h2>
        <p style={{ color: "#ccc" }}>
          RouteSafe is a technology-based scheduling and coordination platform designed to assist users in requesting and organizing transportation services. RouteSafe does not itself operate as a transportation carrier, taxi service, or employer of drivers, and instead functions as a coordination layer that connects riders with independently operating drivers.

All drivers utilizing the platform are individually reviewed to the best of the platform’s current operational capacity and are expected to maintain safe driving practices, valid licensing, and professional conduct while providing transportation services. However, RouteSafe does not guarantee or warrant the behavior, performance, background, or actions of any independent driver at any time.

Riders acknowledge that transportation services arranged through RouteSafe are provided by third-party individuals acting independently, and that any engagement with such services is undertaken at the rider’s own discretion and risk. RouteSafe is not liable for any incidents, delays, disputes, damages, or outcomes that may occur before, during, or after a scheduled ride.

RouteSafe may implement reporting, review, and moderation systems intended to improve platform safety and reliability; however, these systems are not absolute guarantees of safety or performance. All users are encouraged to exercise personal judgment when requesting or accepting rides and to report any concerns through available support channels.

By using RouteSafe, all users agree that the platform is provided on an “as-is” and “as-available” basis, without warranties of any kind, either express or implied. RouteSafe reserves the right to update, modify, restrict, or discontinue features or access at any time as the platform evolves.
        </p>
      </div>

      <div style={{ maxWidth: 700 }}>
        <h2>Support</h2>
        <p style={{ color: "#ccc" }}>
          If you need help scheduling a ride, contact support.
        </p>

        <p>Contact: 317-939-3019</p>
      </div>

      <Link href="/">
        <button
          style={{
            padding: 12,
            backgroundColor: "lime",
            color: "black",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back Home
        </button>
      </Link>
    </main>
  );
}