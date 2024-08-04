import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Title, TextInput, Textarea, Button, Paper } from "@mantine/core";
import classes from "./updateRequestPage.module.css";

function RequestUpdateAppointment() {
  const { appointmentId } = useParams();
  const [formValues, setFormValues] = useState({
    new_date: "",
    new_time: "",
    reason: "",
  });
  const navigate = useNavigate();

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
      await axios.post(
        `http://localhost:8000/api/update-request`,
        { appointmentId, ...formValues },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Your request has been sent to the admin.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to send update request:", error);
    }
  };

  return (
    <Container size={700} className={classes.wrapper}>
      <Title order={1}>Request Appointment Update</Title>
      <Paper padding="lg" style={{ marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="New Appointment Date"
            type="date"
            name="new_date"
            value={formValues.new_date}
            onChange={handleChange}
            required
          />
          <TextInput
            label="New Appointment Time"
            type="time"
            name="new_time"
            value={formValues.new_time}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Reason for Update"
            name="reason"
            value={formValues.reason}
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
            Submit Update Request
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default RequestUpdateAppointment;
