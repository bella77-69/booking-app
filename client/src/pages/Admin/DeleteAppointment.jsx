// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, Text, Button, Container, Title, Paper } from "@mantine/core";
// import axios from "axios";

// function DeleteAppointment() {
//     const navigate = useNavigate();
    
//     const handleDeleteAppointment = async (id) => {
//         console.log('Deleting appointment with id:', id); // Log the id being passed
//         const confirmDelete = window.confirm(
//         "Are you sure you want to delete this appointment?"
//         );
//         if (!confirmDelete) return;
    
//         try {
//         const token = localStorage.getItem("token");
//         await axios.delete(`http://localhost:8000/api/appointments/${id}`, {
//             headers: {
//             Authorization: `Bearer ${token}`,
//             },
//         });
//         navigate(`/dashboard/${localStorage.getItem("userId")}`);
//         } catch (error) {
//         console.error("Failed to delete appointment:", error);
//         }
//     };
    
//     return (
//         <Container size={700} >
//             <Title order={1}>Delete Appointment</Title>
//             <Card shadow="xs" padding="xl">
//                 <Text>Are you sure you want to delete this appointment?</Text>
//             </Card>
     
//         <Button onClick={() => handleDeleteAppointment(1)}>Delete Appointment</Button>

//         </Container>
//     );
//     }

// export default DeleteAppointment;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Text } from '@mantine/core';
import axios from 'axios';

const DeleteAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/appointments/${id}`);
                setAppointment(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/appointments/${id}`);
            alert('Appointment deleted successfully!');
            navigate(`/admin-dashboard/${id}`);
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

    if (!appointment) {
        return <p>Appointment not found.</p>;
    }

    return (
        <Container size={700}>
            <div>
                <Text>Are you sure you want to delete the following appointment?</Text>
                <Text>Appointment ID: {appointment.id}</Text>
                <Text>User ID: {appointment.user_id}</Text>
                <Text>Service ID: {appointment.service_id}</Text>
                <Text>Appointment Date: {new Date(appointment.appointment_date).toLocaleString()}</Text>
                <Text>Status: {appointment.status}</Text>
                <Button
                    color="red"
                    fullWidth
                    style={{ marginTop: '20px' }}
                    onClick={handleDelete}
                >
                    Delete Appointment
                </Button>
                <Button
                    fullWidth
                    style={{ marginTop: '10px' }}
                    onClick={() => navigate('/admin')}
                >
                    Cancel
                </Button>
            </div>
        </Container>
    );
};

export default DeleteAppointment;
