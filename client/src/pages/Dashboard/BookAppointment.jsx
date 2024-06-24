import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Text, Select, Button, Notification, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBookAppointment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      const response = await axios.post(`http://localhost:8000/api/appointments/${id}`, {
        description,
        appointment_date: appointmentDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      window.location.href = `/dashboard/${id}`;
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  const goBack = () => {
    window.location.href = `/dashboard/${id}`;
  };

  return (
    <Container size="sm">
      <Text align="center" size="xl">Book Appointment</Text>
      {error && <Notification color="red" title="Error">{error}</Notification>}
      <Select
        label="Appointment Type"
        placeholder="Select appointment type"
        value={description}
        onChange={(value) => setDescription(value)}
        data={[
          { label: 'Classic Lashes Full Set - 2 hours', value: 'Classic Lashes Full Set' },
          { label: 'Classic Lashes Fill - 1.5 hours', value: 'Classic Lashes Fill'},
          { label: 'Hybrid Lashes Full Set - 2.5 hours', value: 'Hybrid Lashes Full Set' },
          { label: 'Hybrid Lashes Fill - 2 hours', value: 'Hybrid Lashes Fill' },
          { label: 'Volume Lashes Full Set - 3 hours', value: 'Volume Lashes Full Set'},
          { label: 'Volume Lashes Fill - 2.5 hours', value: 'Volume Lashes Fill' },
          { label: 'Russian Lashes Full Set - 3.5 hours', value: 'Russian Lashes Full Set' },
          { label: 'Russian Lashes Fill 3 hours', value: 'Russian Lashes Fill'},
        ]}
        style={{ marginTop: '20px' }}
      />
      <TextInput
        label="Appointment Date"
        placeholder="Enter appointment date"
        type="datetime-local"
        value={appointmentDate}
        onChange={(event) => setAppointmentDate(event.currentTarget.value)}
        required
        style={{ marginTop: '20px' }}
      />
      <Button
        fullWidth
        variant="outline"
        color="blue"
        onClick={handleBookAppointment}
        loading={loading}
        disabled={loading}
        style={{ marginTop: '20px' }}
      >
        Book Appointment
      </Button>
      <Button
        fullWidth
        variant="outline"
        color="gray"
        onClick={goBack}
        style={{ marginTop: '20px' }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
}

export default BookAppointment;
