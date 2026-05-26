"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

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
  const [loading, setLoading] = useState(false);

  function isEmpty() {
    return (
      !formData.fullName ||
      !formData.phone ||
      !formData.pickupLocation ||
      !formData.dropoffLocation ||
      !formData.pickupDate ||
      !formData.pickupTime
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isEmpty()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const { data: existing } = await supabase
      .from("rides")
      .select("*")
      .eq("phone", formData.phone)
      .eq("pickup", formData.pickupLocation)
      .eq("dropoff", formData.dropoffLocation)
      .eq("pickup_date", formData.pickupDate);

    if (existing && existing.length > 0) {
      alert("You already scheduled this ride for that date.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("rides").insert([
      {
        name: formData.fullName,
        phone: formData.phone,
        pickup: formData.pickupLocation,
        dropoff: formData.dropoffLocation,
        pickup_date: formData.pickupDate,
        pickup_time: formData.pickupTime,
        status: "pending",
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
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
      }}
    >
      <h1 style={{ color: "#00ff66" }}>RouteSafe</h1>

      <h2>Schedule a Ride with Wyatt</h2>

      <p style={{ maxWidth: 400, textAlign: "center", color: "#aaa" }}>
        Schedule a safe ride in advance. Enter your pickup and dropoff details below.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
          maxWidth: 320,
        }}
      >
        <input
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
          style={inputStyle}
        />

        <label>Pickup Date</label>
        <input
          type="date"
          value={formData.pickupDate}
          onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
          style={inputStyle}
        />

        <label>Pickup Time</label>
        <input
          type="time"
          value={formData.pickupTime}
          onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
          style={inputStyle}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Submitting..." : "Confirm Ride"}
        </button>
      </form>

      {submitted && (
        <div
          style={{
            border: "2px solid #00ff66",
            padding: 10,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          Ride submitted successfully ✔
        </div>
      )}
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "2px solid #00ff66",
  backgroundColor: "black",
  color: "white",
};

const buttonStyle: React.CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "none",
  backgroundColor: "#00ff66",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
};