import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Text } from '@mantine/core';

function DeleteAppointment() {
  const { user_id, id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/appointments/delete/${id}`);
      navigate('/dashboard/' + user_id);
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  return (
    <Container>
      <Text>Are you sure you want to delete this appointment?</Text>
      <Button variant='outline' onClick={handleDelete} color="red"  style={{ marginTop: "20px" }}>
        Delete
      </Button>
    
      <Button onClick={() => navigate(`/dashboard/${localStorage.getItem("userId")}`)} variant='outline' style={{ marginTop: "20px" }}>Cancel</Button>
    </Container>
  );
}

export default DeleteAppointment;
