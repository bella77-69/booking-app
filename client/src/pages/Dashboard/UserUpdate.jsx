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
  Divider,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

function UpdateAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setAppointmentTime] = useState("");
  const [message, setMessage] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [currentServiceName, setCurrentServiceName] = useState("");

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
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/appointments/${id}`
        );
        const appointment = response.data;

        // Format the date to 'yyyy-MM-dd'
        const formattedDate = new Date(appointment.appointment_date)
          .toISOString()
          .split("T")[0];

        setServiceId(appointment.service_id.toString());
        setAppointmentDate(formattedDate);
        setAppointmentTime(appointment.start_time);

        // Find the current service name
        const currentService = services.find(
          (service) => service.service_id.toString() === appointment.service_id.toString()
        );
        setCurrentServiceName(currentService ? currentService.service_name : "Unknown Service");
      } catch (error) {
        console.error("An error occurred while fetching appointment data:", error);
        setMessage("Failed to fetch appointment details.");
      }
    };
    if (services.length) {
      fetchAppointmentData();
    }
  }, [id, services]);

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

  const handleUpdateAppointment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/appointments/${id}`,
        {
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

      console.log("Update Response:", response);

      navigate(`/dashboard/${id}`);
      showNotification({
        title: "Success",
        message: "Appointment updated successfully",
        color: "green",
      });
    } catch (error) {
      console.error("Update Error:", error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
    }
  };

  const goBack = () => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <Container size="sm">
      <Text align="center" size="xl">
        Update Appointment
      </Text>
      {message && (
        <Notification color="red" title="Error">
          {message}
        </Notification>
      )}
      
      <Divider my="sm" />
      <Text align="left" size="md">
        <strong>Current Appointment Details:</strong>
      </Text>
      <Text align="left" size="sm">
        Service: {currentServiceName}
      </Text>
      <Text align="left" size="sm">
        Date: {appointmentDate}
      </Text>
      <Text align="left" size="sm">
        Time: {startTime}
      </Text>
      <Divider my="sm" />

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
        onClick={handleUpdateAppointment}
        style={{ marginTop: "20px" }}
      >
        Update Appointment
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

export default UpdateAppointment;
