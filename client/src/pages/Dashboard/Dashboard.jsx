import React, { useState, useEffect } from "react";
import axios from "axios";

function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        setError("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return { appointments, loading, error };
}

function Dashboard() {
  const { appointments, loading, error } = useAppointments();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Appointments:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <ul>
                <li>User Id: {appointment.user_id}</li>
                <li>Description: {appointment.description}</li>
                <li>Appointment Date: {appointment.appointment_date}</li>
                <li>Appointment Id: {appointment.appointment_id}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
