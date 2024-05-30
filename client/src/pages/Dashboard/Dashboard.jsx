import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  const handleLogout = async () => {
    try {
      // Clear user token or session on the client side
      localStorage.removeItem("token"); 
      // Redirect the user to the login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/appointments", {
       
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      
      }
    };

    fetchAppointments();
  }, []); 

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Appointments:</h2>
      <ul>
        {appointments.map((appointment) => (
          <ul key={appointment.id}>
            <li>User Id:{appointment.user_id}</li>
            <li>Description:{appointment.description}</li>
            <li>Appointment Date:{appointment.appointment_date}</li>
            <li>Appointment Id: {appointment.appointment_id}</li>
          </ul>
       
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
