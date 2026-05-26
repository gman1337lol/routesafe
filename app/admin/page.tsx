"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Ride = {
  id: number;
  name: string;
  phone: string;
  pickup: string;
  dropoff: string;
  pickup_date: string;
  pickup_time: string;
};

export default function AdminPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  async function fetchRides() {
    const { data, error } = await supabase
      .from("rides")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setRides(data || []);
    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        padding: 20,
      }}
    >
      <h1 style={{ color: "#00ff66" }}>RouteSafe Admin Dashboard</h1>

      {loading ? (
        <p>Loading rides...</p>
      ) : rides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 20,
          }}
        >
          {rides.map((ride) => (
            <div
              key={ride.id}
              style={{
                border: "2px solid #00ff66",
                borderRadius: 12,
                padding: 16,
                backgroundColor: "#111",
              }}
            >
              <p><strong>Name:</strong> {ride.name}</p>
              <p><strong>Phone:</strong> {ride.phone}</p>
              <p><strong>Pickup:</strong> {ride.pickup}</p>
              <p><strong>Dropoff:</strong> {ride.dropoff}</p>
              <p><strong>Date:</strong> {ride.pickup_date}</p>
              <p><strong>Time:</strong> {ride.pickup_time}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}