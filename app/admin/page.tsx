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
  status: string;
  driver: string | null;
};

const ADMIN_PASSWORD = "route123";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  // store selected driver per ride (keyed by ride id)
  const [selectedDrivers, setSelectedDrivers] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    if (authenticated) fetchRides();
  }, [authenticated]);

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

  async function updateStatus(id: number, status: string) {
    const { error } = await supabase
      .from("rides")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchRides();
  }

  async function assignDriver(id: number) {
    const driver = selectedDrivers[id];

    if (!driver) {
      alert("Pick a driver first");
      return;
    }

    const { error } = await supabase
      .from("rides")
      .update({
        driver: driver,
        status: "assigned",
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchRides();
  }

  if (!authenticated) {
    return (
      <div style={{ padding: 20, background: "black", color: "white", minHeight: "100vh" }}>
        <h2 style={{ color: "#00ff66" }}>Admin Login</h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: 10,
            border: "2px solid #00ff66",
            background: "black",
            color: "white",
            borderRadius: 8,
          }}
        />

        <button
          onClick={() => {
            if (password === ADMIN_PASSWORD) {
              setAuthenticated(true);
            } else {
              alert("Wrong password");
            }
          }}
          style={{
            marginLeft: 10,
            padding: 10,
            background: "#00ff66",
            border: "none",
            borderRadius: 8,
          }}
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "black", color: "white", padding: 20 }}>
      <h1 style={{ color: "#00ff66" }}>RouteSafe Admin</h1>

      {loading ? (
        <p>Loading rides...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {rides.map((ride) => (
            <div
              key={ride.id}
              style={{
                border: "2px solid #00ff66",
                padding: 12,
                borderRadius: 10,
                background: "#111",
              }}
            >
              <p><b>{ride.name}</b> ({ride.phone})</p>
              <p>{ride.pickup} → {ride.dropoff}</p>
              <p>{ride.pickup_date} @ {ride.pickup_time}</p>

              <p>
                <b>Status:</b>{" "}
                <span style={{ color: "#00ff66" }}>
                  {ride.status || "pending"}
                </span>
              </p>

              <p>
                <b>Driver:</b>{" "}
                <span style={{ color: "#00ff66" }}>
                  {ride.driver || "unassigned"}
                </span>
              </p>

              {/* DRIVER ASSIGN SECTION */}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <select
                  value={selectedDrivers[ride.id] || ""}
                  onChange={(e) =>
                    setSelectedDrivers({
                      ...selectedDrivers,
                      [ride.id]: e.target.value,
                    })
                  }
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    background: "black",
                    color: "white",
                    border: "1px solid #00ff66",
                  }}
                >
                  <option value="">Select Driver</option>
                  <option value="Wyatt">Wyatt</option>
                  <option value="Driver 2">Driver 2</option>
                  <option value="Driver 3">Driver 3</option>
                </select>

                <button
                  onClick={() => assignDriver(ride.id)}
                  style={{
                    padding: 8,
                    background: "#00ff66",
                    border: "none",
                    borderRadius: 6,
                  }}
                >
                  Assign
                </button>
              </div>

              {/* STATUS BUTTONS */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                <button onClick={() => updateStatus(ride.id, "test")}>Test</button>
                <button onClick={() => updateStatus(ride.id, "pending")}>Pending</button>
                <button onClick={() => updateStatus(ride.id, "completed")}>Completed</button>
                <button onClick={() => updateStatus(ride.id, "cancelled")}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}