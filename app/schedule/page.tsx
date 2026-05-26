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
    opacity: 1,
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
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
 e.preventDefault();

// 🧠 1. BLOCK EMPTY SUBMISSIONS (FIRST)
if (
  !formData.fullName ||
  !formData.phone ||
  !formData.pickupLocation ||
  !formData.dropoffLocation ||
  !formData.pickupDate ||
  !formData.pickupTime
) {
  alert("Please fill out all fields.");
  return;
}

// ⏱️ 2. COOLDOWN CHECK
const lastSubmit = localStorage.getItem("lastSubmitTime");

if (lastSubmit && Date.now() - Number(lastSubmit) < 60000) {
  alert("Please wait 1 minute before submitting again.");
  return;
}

// 🧠 3. DUPLICATE CHECK
const { data: duplicate } = await supabase
  .from("rides")
  .select("*")
  .eq("phone", formData.phone)
  .eq("pickup", formData.pickupLocation)
  .eq("dropoff", formData.dropoffLocation)
  .eq("pickup_date", formData.pickupDate);

if (duplicate && duplicate.length > 0) {
  alert("You already scheduled this exact ride.");
  return;
}
    setLoading(true);

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

    setLoading(false);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    localStorage.setItem("lastSubmitTime", Date.now().toString());

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

      <p style={{ maxWidth: 400, textAlign: "center", color: "#ccc" }}>
        Schedule a safe ride with Wyatt 12-24 hours in advance.
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

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Submitting..." : "Confirm Ride"}
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