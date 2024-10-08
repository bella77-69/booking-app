import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Text, Title, Paper, Loader, Button } from "@mantine/core";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/appointments/${id}`
        );
        setAppointment(response.data);
        console.log("Appointment data:", response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointment details.");
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  if (loading) {
    return <Loader size="xl" />;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  if (!appointment) {
    return <Text>Appointment not found.</Text>;
  }

  const backToAdminDashboard = () => {
    navigate(`/admin-dashboard/`);
  };

  const adminUpdateAppointment = (id) => {
    navigate(`/admin/update-appointment/${id}`);
  };

  const adminDeleteAppointment = (id) => {
    navigate(`/admin/delete-appointment/${id}`);
  };

  return (
    <Container size={700}>
      <Title order={2}>Appointment Details</Title>
      <Paper style={{ padding: "15px" }}>
        <Text>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</Text>
        <Text>Time: {appointment.start_time}</Text>
        <Text>Appointment ID: {appointment.id}</Text>
        
        {/* Display User Details */}
        <Text>Name: {appointment.full_name}</Text>
        <Text>Email: {appointment.user_email}</Text>
        <Text>Username: {appointment.username}</Text>
        <Text>Phone Number: {appointment.phone_number}</Text>
        
        {/* Display Service Details */}
        <Text>Service Booked: {appointment.service_name}</Text>
        <Text>Price: {appointment.service_price}</Text>
        <Text>Service Duration: {appointment.service_duration}</Text>
        <Text>Status: {appointment.status}</Text>

        <Button
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={backToAdminDashboard}
        >
          Back to Calendar
        </Button>

        <Button
          color="blue"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={() => adminUpdateAppointment(appointment.id)}
        >
          Update Appointment
        </Button>
        <Button
          color="red"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={() => adminDeleteAppointment(appointment.id)}
        >
          Delete Appointment
        </Button>
      </Paper>
    </Container>
  );
};

export default AppointmentDetails;
