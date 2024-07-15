import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Text, Button, Container, Title, Paper } from "@mantine/core";

const AdminDashboard = () => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAppointments = await axios.get(
          "http://localhost:8000/api/admin"
        );

        setAppointment(responseAppointments.data);

        console.log("Appointments data:", responseAppointments.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const adminUpdateAppointment = async (appointment_id) => {
    navigate(`/admin/update-appointment/${appointment_id}`)
    };

  return (
    <Container size={700}>
      <Title order={1}>Admin Dashboard</Title>
      <div>
        <h2>Appointments</h2>
        <ul>
          {appointment.map((appointments, index) => (
            <Card shadow="xs" padding="xl" key={index} size={700}>
              <Paper style={{ marginBottom: "15px", padding: "15px" }}>
                <Text>Appointment ID: {appointments.appointment_id}</Text>

                <Text>Name: {appointments.full_name}</Text>
                <Text>Email: {appointments.email}</Text>
                <Text>Username: {appointments.username}</Text>
                <Text>Phone Number: {appointments.phone_number}</Text>
                <Text>Service Booked: {appointments.service_name}</Text>
                <Text>
                  Appointment Date:{" "}
                  {new Date(appointments.appointment_date).toLocaleString()}
                </Text>
                <Text>Price: {appointments.service_price}</Text>
                <Text>Status: {appointments.status}</Text>
                <Button
                fullWidth
                variant="default"
                radius="xl"
                size="md"
                onClick={() => adminUpdateAppointment(appointments.appointment_id)}
                style={{ marginTop: "20px" }}

                >Update</Button>
              </Paper>
            </Card>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default AdminDashboard;
