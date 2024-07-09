import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Text, Button, TextInput } from '@mantine/core';

function UpdateAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    status: '',
    appointmentDate: ''

  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.appointment) {
          setAppointment(response.data.appointment);
        }
      } catch (error) {
        console.error('Failed to fetch appointment:', error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/appointments/${id}`, appointment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/dashboard/${id}`);
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const goBack = () => {
    window.location.href = `/dashboard/${id}`;
  };

  return (
    <Container size="sm">
      <Text align="center" size="xl">Update Appointment</Text>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Status"
          name="status"
          value={appointment.status || ''}
          onChange={handleChange}
          required
          fullwidth="true" 
          style={{ marginBottom: '20px' }}
        />
        <TextInput
          label="Appointment Date"
          type="datetime-local"
          name="appointmentDate"
          value={appointment.appointmentDate || ''}
          onChange={handleChange}
          required
          fullwidth="true" 
          style={{ marginBottom: '20px' }}
        />
    
        <Button
          type="submit"
          fullwidth="true" 
          variant="outline"
          color="blue"
          style={{ marginTop: '20px' }}
        >
          Update Appointment
        </Button>
        <Button
        fullwidth="true" 
        variant="outline"
        color="gray"
        onClick={goBack}
        style={{ marginTop: '20px' }}
      >
        Back to Dashboard
      </Button>
      </form>
    </Container>
  );
}

export default UpdateAppointment;
