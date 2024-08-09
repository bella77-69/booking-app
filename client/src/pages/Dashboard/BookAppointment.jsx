import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Text,
  Select,
  Button,
  Notification,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [startTime, setAppointmentTime] = useState("");
  const [message, setMessage] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("An error occurred while fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchAvailableAppointments = async () => {
      if (!appointmentDate) return;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/appointments/available/open",
          {
            params: { date: appointmentDate },
          }
        );

        const uniqueTimes = [
          ...new Set(response.data.map((app) => app.start_time)),
        ];

        setAvailableTimes(uniqueTimes);
      } catch (error) {
        console.error(
          "An error occurred while fetching available times:",
          error
        );
      }
    };
    fetchAvailableAppointments();
  }, [appointmentDate]);

  const handleBookAppointment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User not authenticated. Please log in.");
        return;
      }
  
      const response = await axios.post(
        `http://localhost:8000/api/appointments`,
        {
          user_id: id,
          service_id: serviceId,
          appointment_date: appointmentDate,
          start_time: startTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Booking Response:", response);
  
      navigate(`/dashboard/${id}`);
      showNotification({
        title: "Success",
        message: "Appointment booked successfully",
        color: "green",
      });
    } catch (error) {
      console.error("Booking Error:", error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    }
  };

  const goBack = () => {
    navigate(`/dashboard/${localStorage.getItem("userId")}`);
  };

  return (
    <Container size="sm">
      <Text align="center" size="xl">
        Book Appointment
      </Text>
      {message && (
        <Notification color="red" title="Error">
          {message}
        </Notification>
      )}
      <Select
        label="Service"
        placeholder="Select a service"
        value={serviceId}
        onChange={(value) => setServiceId(value)}
        data={services.map((service) => ({
          value: service.service_id.toString(),
          label: service.service_name,
        }))}
        required
        style={{ marginTop: "20px" }}
      />
      <TextInput
        label="Appointment Date"
        placeholder="Enter appointment date"
        type="date"
        value={appointmentDate}
        onChange={(event) => setAppointmentDate(event.currentTarget.value)}
        required
        style={{ marginTop: "20px" }}
      />
      <Select
        label="Appointment Time"
        placeholder="Select an available time"
        value={startTime}
        onChange={(value) => setAppointmentTime(value)}
        data={availableTimes.map((time) => ({
          value: time,
          label: time,
        }))}
        required
        style={{ marginTop: "20px" }}
      />
      <Button
        fullWidth
        variant="outline"
        color="blue"
        onClick={handleBookAppointment}
        style={{ marginTop: "20px" }}
      >
        Book Appointment
      </Button>
      <Button
        fullWidth
        variant="outline"
        color="gray"
        onClick={goBack}
        style={{ marginTop: "20px" }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
}

export default BookAppointment;