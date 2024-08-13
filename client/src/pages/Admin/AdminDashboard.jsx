import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Text, Button, Container, Title, Paper, Loader } from "@mantine/core";

const AdminDashboard = () => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAppointments = await axios.get("http://localhost:8000/api/admin");
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
    return <Loader size="xl" />;
  }

  const adminUpdateAppointment = (booking_id) => {
    navigate(`/admin/update-appointment/${booking_id}`);
  };

  const adminDeleteAppointment = (booking_id) => {
    navigate(`/admin/delete-appointment/${booking_id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <Container size={700}>
      <Title order={1}>Admin Dashboard</Title>
      <div>
        <h2>Booked Appointments</h2>
        <div>
          {appointment.length === 0 ? (
            <Text>No booked appointments available.</Text>
          ) : (
            appointment.map((appointments) => (
              <Card shadow="xs" padding="xl" key={appointments.booking_id}>
                <Paper style={{ marginBottom: "15px", padding: "15px" }}>
                  <Text>Appointment ID: {appointments.booking_id}</Text>
                  <Text>Name: {appointments.full_name}</Text>
                  <Text>Email: {appointments.email}</Text>
                  <Text>Username: {appointments.username}</Text>
                  <Text>Phone Number: {appointments.phone_number}</Text>
                  <Text>Service Booked: {appointments.service_name}</Text>
                  <Text>Date: {formatDate(appointments.appointment_date)}</Text>
                  <Text>Time: {appointments.start_time}</Text>
                  <Text>Price: {appointments.service_price}</Text>
                  <Text>Status: {appointments.status}</Text>
                  <Button
                    fullWidth
                    variant="default"
                    radius="xl"
                    size="md"
                    onClick={() => adminUpdateAppointment(appointments.booking_id)}
                    sx={{ marginTop: 20 }}
                  >
                    Update
                  </Button>
                  <Button
                    fullWidth
                    variant="default"
                    radius="xl"
                    size="md"
                    onClick={() => adminDeleteAppointment(appointments.booking_id)}
                    sx={{ marginTop: 20 }}
                  >
                    Delete
                  </Button>
                </Paper>
              </Card>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard;
