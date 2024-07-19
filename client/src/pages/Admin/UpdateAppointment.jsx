import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextInput, Button, Select } from "@mantine/core";
import axios from "axios";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    user_id: "",
    service_id: "",
    appointment_date: "",
    status: "Scheduled",
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const allowedStatuses = ["Scheduled", "Confirmed", "Completed", "Cancelled"];

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/appointments/${id}`
        );
        const data = response.data;
        setAppointment({
          user_id: data.user_id,
          service_id: data.service_id.toString(), // Convert to string
          appointment_date: new Date(data.appointment_date)
            .toISOString()
            .slice(0, 16),
          status: data.status,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/services");
        setServices(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAppointment();
    fetchServices();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      status: value,
    }));
  };

  const handleServiceChange = (value) => {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      service_id: value, // The value will be a string
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentData = {
        ...appointment,
        service_id: parseInt(appointment.service_id, 10), // Convert back to number
      };
      await axios.put(
        `http://localhost:8000/api/appointments/${id}`,
        appointmentData
      );
      alert("Appointment updated successfully!");
      navigate(`/admin-dashboard/${appointment.user_id}`);
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

  const backToAdminDashboard = () => {
    navigate(`/admin-dashboard/${appointment.user_id}`);
  };

  return (
    <Container size={700}>
      <form onSubmit={handleSubmit}>
        <div>
          <TextInput
            label="User ID"
            name="user_id"
            value={appointment.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Select
            label="Service"
            name="service_id"
            data={services.map((service) => ({
              value: service.service_id.toString(),
              label: service.service_name,
            }))}
            value={appointment.service_id}
            onChange={handleServiceChange}
            required
          />
        </div>
        <div>
          <TextInput
            label="Appointment Date"
            name="appointment_date"
            type="datetime-local"
            value={appointment.appointment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Select
            label="Status"
            name="status"
            data={allowedStatuses.map((status) => ({
              value: status,
              label: status,
            }))}
            value={appointment.status}
            onChange={handleStatusChange}
            required
          />
        </div>
        <Button type="submit" fullWidth style={{ marginTop: "20px" }}>
          Update Appointment
        </Button>
        <Button
          color="red"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={backToAdminDashboard}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default UpdateAppointment;
