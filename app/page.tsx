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

    // 🔥 SPAM CHECK (same exact ride within short window)
    const { data: existing } = await supabase
      .from("rides")
      .select("*")
      .eq("phone", formData.phone)
      .eq("pickupLocation", formData.pickupLocation)
      .eq("dropoffLocation", formData.dropoffLocation)
      .eq("pickupDate", formData.pickupDate);

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
    <main style={{
      padding: 20,
      minHeight: "100vh",
      backgroundColor: "black",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: 20,
    }}>
      <h1>RouteSafe</h1>

      <h2>Schedule a Ride</h2>

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
        />

        <input
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <input
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
        />

        <input
          placeholder="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
        />

        <label>Pickup Date</label>
        <input
          type="date"
          value={formData.pickupDate}
          onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
        />

        <label>Pickup Time</label>
        <input
          type="time"
          value={formData.pickupTime}
          onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Confirm Ride"}
        </button>
      </form>

      {submitted && (
        <p style={{ color: "#00ff66" }}>
          Ride submitted successfully
        </p>
      )}
    </main>
  );
}