"use client";

import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
  });
  const [submitted, setSubmitted] = useState(false);

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/rides", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

const data = await response.json();

console.log(data);

setSubmitted(true);
  }

  return (
    <main
      style={{
        padding: 20,
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1>RouteSafe</h1>

      <h2>Schedule a Ride with Wyatt</h2>

      <p
        style={{
          maxWidth: 400,
          textAlign: "center",
          color: "#ccc",
        }}
      >
        Schedule a safe ride with Wyatt 12-24 hours in advance. Please provide
        your pickup and dropoff locations, as well as your preferred pickup
        date and time.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
          maxWidth: 300,
        }}
      >
        <input
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "none",
          }}
        />
        <input
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })
        }
        style={{
          padding: 10,
          borderRadius: 8,
          border: "none",
        }}
        />
        <input
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "none",
          }}
        />
        <input
          placeholder="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "none",
          }}
        />

        <label>Pickup Date</label>
        <input type="date" 
        value={formData.pickupDate}
        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
        style={{ padding: 10,
          borderRadius: 8,
          border: "none",
         }} />

        <label>Pickup Time</label>
        <input type="time" 
        value={formData.pickupTime}
        onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
        style={{ padding: 10,
          borderRadius: 8,
          border: "none",
         }} />

        <button
          type="submit"
          style={{
            padding: 10,
            backgroundColor: "lime",
            color: "black",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          Confirm Ride
        </button>
      </form>

      {submitted && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            border: "2px solid lime",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          Ride request submitted successfully
        </div>
      )}
    </main>
  );
}