import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Text, Button, Container, Title, Paper, Modal, TextInput, Textarea } from "@mantine/core";
import classes from "./dashboard.module.css";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [deleteRequest, setDeleteRequest] = useState({ open: false, appointmentId: null });
  const [reason, setReason] = useState("");
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
        console.log('Appointments data:', response.data.appointments); // Log the data
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
  
    fetchAppointments();
  }, []);

  const handleBookAppointment = () => {
    const user_id = localStorage.getItem("userId");
    navigate(`/book-appointment/${user_id}`);
  };

  // const handleUpdateAppointment = (id) => {
  //   navigate(`/update-appointment/${id}`);
  // };

  const handleUpdateAppointment  = () => {
    const user_id = localStorage.getItem("userId");
    navigate(`/update-appointment/${user_id}`);
  };

  const handleOpenDeleteRequest = (appointmentId) => {
    setDeleteRequest({ open: true, appointmentId });
  };

  const handleCloseDeleteRequest = () => {
    setDeleteRequest({ open: false, appointmentId: null });
    setReason("");
  };

  const handleSubmitDeleteRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("userId");
      
      await axios.post(
        `http://localhost:8000/api/delete-request`,
        { appointmentId: deleteRequest.appointmentId, reason, userId: user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Your request has been sent to the admin.");
      handleCloseDeleteRequest();
    } catch (error) {
      console.error("Failed to send delete request:", error);
    }
  };

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
                <Text>Price: {appointment.service_price}</Text>
                <Text>Duration: {appointment.service_duration}</Text>
                <Text>Description: {appointment.description}</Text>
                <Text>User: {appointment.user_name}</Text>
                <Text>Email: {appointment.user_email}</Text>
                <Text>
                  Date:{" "}
                  {new Date(appointment.appointment_date).toLocaleString()}
                </Text>
                <Text>Status: {appointment.status}</Text>
                <Button
                  variant="outline"
                  color="blue"
                  onClick={() => handleUpdateAppointment(appointment.id)}
                >
                  Request to Update
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => handleOpenDeleteRequest(appointment.id)}
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

      <Modal
        opened={deleteRequest.open}
        onClose={handleCloseDeleteRequest}
        title="Request Appointment Deletion"
      >
        <TextInput
          label="Reason for Deletion"
          placeholder="Enter the reason for deleting this appointment"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button
          fullWidth
          variant="outline"
          color="red"
          onClick={handleSubmitDeleteRequest}
          style={{ marginTop: "20px" }}
        >
          Submit Request
        </Button>
      </Modal>
    </Container>
  );
}

export default Dashboard;
