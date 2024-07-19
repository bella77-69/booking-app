import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Text } from "@mantine/core";
import axios from "axios";

const DeleteAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/appointments/${id}`
        );
        setAppointment(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/appointments/${id}`);
      alert("Appointment deleted successfully!");
      navigate(`/admin-dashboard/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!appointment) {
    return <p>Appointment not found.</p>;
  }

  const backToAdminDashboard = () => {
    navigate(`/admin-dashboard/${id}`);
  };

  return (
    <Container size={700}>
      <div>
        <Text>Are you sure you want to delete the following appointment?</Text>
        <Text>Appointment ID: {appointment.id}</Text>
        <Text>User ID: {appointment.user_id}</Text>
        <Text>Service ID: {appointment.service_id}</Text>
        <Text>
          Appointment Date:{" "}
          {new Date(appointment.appointment_date).toLocaleString()}
        </Text>
        <Text>Status: {appointment.status}</Text>
        <Button fullWidth style={{ marginTop: "20px" }} onClick={handleDelete}>
          Delete Appointment
        </Button>
        <Button
          color="red"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={backToAdminDashboard}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default DeleteAppointment;
