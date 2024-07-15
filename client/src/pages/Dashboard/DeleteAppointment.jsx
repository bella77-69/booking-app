import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Text, Button, Container, Title, Paper } from "@mantine/core";
import axios from "axios";

function DeleteAppointment() {
    const navigate = useNavigate();
    
    const handleDeleteAppointment = async (id) => {
        console.log('Deleting appointment with id:', id); // Log the id being passed
        const confirmDelete = window.confirm(
        "Are you sure you want to delete this appointment?"
        );
        if (!confirmDelete) return;
    
        try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8000/api/appointments/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        navigate(`/dashboard/${localStorage.getItem("userId")}`);
        } catch (error) {
        console.error("Failed to delete appointment:", error);
        }
    };
    
    return (
        <Container size={700} >
            <Title order={1}>Delete Appointment</Title>
            <Card shadow="xs" padding="xl">
                <Text>Are you sure you want to delete this appointment?</Text>
            </Card>
     
        <Button onClick={() => handleDeleteAppointment(1)}>Delete Appointment</Button>

        </Container>
    );
    }

export default DeleteAppointment;
