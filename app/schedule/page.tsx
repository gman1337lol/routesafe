"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Page() {
  const inputStyle = {
    padding: 12,
    borderRadius: 10,
    border: "2px solid #00ff66",
    backgroundColor: "black",
    color: "white",
    outline: "none",
  };

  const buttonStyle = {
    padding: 12,
    backgroundColor: "#00ff66",
    color: "black",
    border: "2px solid #00ff66",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  };

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

    const { error } = await supabase.from("rides").insert([
      {
        name: formData.fullName,
        phone: formData.phone,
        pickup: formData.pickupLocation,
        dropoff: formData.dropoffLocation,
        pickup_date: formData.pickupDate,
        pickup_time: formData.pickupTime,
      },
    ]);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    setSubmitted(true);

    setFormData({
      fullName: "",
      phone: "",
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      pickupTime: "",
    });
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
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
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
        Schedule a safe ride with a driver 12-24 hours in advance. Please provide
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
        }}
      >
        <input
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          style={inputStyle}
        />

        <input
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          style={inputStyle}
        />

        <input
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={(e) =>
            setFormData({ ...formData, pickupLocation: e.target.value })
          }
          style={inputStyle}
        />

        <input
          placeholder="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={(e) =>
            setFormData({ ...formData, dropoffLocation: e.target.value })
          }
          style={inputStyle}
        />

        <label>Pickup Date</label>
        <input
          type="date"
          value={formData.pickupDate}
          onChange={(e) =>
            setFormData({ ...formData, pickupDate: e.target.value })
          }
          style={inputStyle}
        />

        <label>Pickup Time</label>
        <input
          type="time"
          value={formData.pickupTime}
          onChange={(e) =>
            setFormData({ ...formData, pickupTime: e.target.value })
          }
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Confirm Ride
        </button>
      </form>

      {submitted && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            border: "2px solid #00ff66",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          Ride request submitted successfully
        </div>
      )}
    </main>
  );
}