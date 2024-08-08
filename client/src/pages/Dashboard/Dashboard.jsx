import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Text, Button, Container, Title, Paper } from "@mantine/core";
import classes from "./dashboard.module.css";

function Dashboard() {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:8000/api/appointments/user/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.appointments);
        console.log("Appointments data:", response.data.appointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, [id]);

  const handleBookAppointment = () => {
    const user_id = localStorage.getItem("userId");
    navigate(`/book-appointment/${user_id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const user_id = localStorage.getItem("userId");
  return (
    <Container size={700} className={classes.wrapper}>
      <Title order={1}>Welcome to Dashboard</Title>
      <Button
        fullWidth
        variant="default"
        radius="xl"
        size="md"
        onClick={handleBookAppointment}
        style={{ marginTop: "20px" }}
      >
        Book Appointment
      </Button>

      {appointments.length > 0 && (
        <div>
          <h2>Upcoming Appointments:</h2>
          {appointments.map((appointment, index) => (
            <Card key={index} size={700} className={classes.card}>
              <Paper style={{ marginBottom: "15px", padding: "15px" }}>
                <Text>Service: {appointment.service_name}</Text>
                <Text>Description: {appointment.description}</Text>
                <Text>Price: {appointment.service_price}</Text>
                <Text>Duration: {appointment.service_duration}</Text>
                <Text>Date: {formatDate(appointment.appointment_date)}</Text>
                <Text>Time: {appointment.appointment_time}</Text>
                <br />
                <Button
                  variant="outline"
                  color="red"
                  onClick={() =>
                    navigate(`/delete-appointment/${user_id}/${appointment.id}`)
                  }
                >
                  Request to Delete
                </Button>
              </Paper>
            </Card>
          ))}
        </div>
      )}

      <Button
        variant="default"
        radius="xl"
        size="md"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>
    </Container>
  );
}

export default Dashboard;
