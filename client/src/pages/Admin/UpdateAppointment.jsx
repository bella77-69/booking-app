import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Text, Title, Paper, Loader, Button, TextInput, Select } from "@mantine/core";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    service_id: "",
    appointment_date: "",
    start_time: "",
    status: "",
  });

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/appointments/${id}`
        );
        setAppointment(response.data);
        setFormData({
          service_id: response.data.service_id,
          appointment_date: new Date(response.data.appointment_date).toISOString().slice(0, 10), // format as YYYY-MM-DD
          start_time: response.data.start_time,
          status: response.data.status,
        });

        const servicesResponse = await axios.get("http://localhost:8000/api/services");
        setServices(servicesResponse.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointment or service details.");
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (value) => {
    setFormData({
      ...formData,
      service_id: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/appointments/${id}`, formData);
      navigate(`/admin-dashboard`);
    } catch (err) {
      setError("Failed to update the appointment.");
    }
  };

  if (loading) {
    return <Loader size="xl" />;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <Container size={700}>
      <Title order={2}>Update Appointment</Title>
      <Paper style={{ padding: "15px" }}>
        <form onSubmit={handleSubmit}>
          <Select
            label="Service"
            placeholder="Select a service"
            data={services.map((service) => ({
              value: service.service_id.toString(),
              label: service.service_name,
            }))}
            value={formData.service_id}
            onChange={handleServiceChange}
            required
          />

  <TextInput
  label="Appointment Date"
  placeholder="YYYY-MM-DD"
  name="appointment_date"
  value={formData.appointment_date}
  onChange={handleChange}
  required
  />

          <TextInput
            label="Start Time"
            placeholder="HH:MM"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />

          <Select
            label="Status"
            placeholder="Select a status"
            data={[
              { value: "Pending", label: "Pending" },
              { value: "Confirmed", label: "Confirmed" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
            name="status"
            value={formData.status}
            onChange={(value) =>
              setFormData({
                ...formData,
                status: value,
              })
            }
            required
          />

          <Button type="submit" color="blue" fullWidth style={{ marginTop: "20px" }}>
            Update Appointment
          </Button>
        </form>

        <Button
          color="red"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={() => navigate(`/admin-dashboard`)}
        >
          Cancel
        </Button>
      </Paper>
    </Container>
  );
};

export default UpdateAppointment;

