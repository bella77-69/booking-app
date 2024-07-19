import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Title, TextInput, Textarea, Button, Paper } from "@mantine/core";
import classes from "./updateRequestPage.module.css";

function UpdateRequestPage() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [formValues, setFormValues] = useState({
    service_name: "",
    service_price: "",
    service_duration: "",
    description: "",
    appointment_date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
        `http://localhost:8000/api/appointments/user/${id}`,
        
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response", response)
        setAppointment(response.data.appointment);
        // setFormValues({
        //   service_name: response.data.appointment.service_name,
        //   service_price: response.data.appointment.service_price,
        //   service_duration: response.data.appointment.service_duration,
        //   description: response.data.appointment.description,
        //   appointment_date: new Date(response.data.appointment.appointment_date).toISOString().substring(0, 16), // ISO format
        // });
      } catch (error) {
        console.error("Failed to fetch appointment details:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/appointments/${appointmentId}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Appointment updated successfully.");
      navigate("/dashboard"); // Redirect to dashboard or another page
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  if (!appointment) return <p>Loading...</p>;

  return (
    <Container size={700} className={classes.wrapper}>
      <Title order={1}>Update Appointment</Title>
      <Paper padding="lg" style={{ marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Service Name"
            name="service_name"
            value={formValues.service_name}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Service Price"
            name="service_price"
            value={formValues.service_price}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Service Duration"
            name="service_duration"
            value={formValues.service_duration}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Appointment Date"
            type="datetime-local"
            name="appointment_date"
            value={formValues.appointment_date}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="outline"
            color="blue"
            style={{ marginTop: "20px" }}
          >
            Submit Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default UpdateRequestPage;
