// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Text, Button, TextInput } from '@mantine/core';

// function UpdateAppointment() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [appointment, setAppointment] = useState({
//     status: '',
//     appointmentDate: ''

//   });

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:8000/api/appointments/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.data && response.data.appointment) {
//           setAppointment(response.data.appointment);
//         }
//       } catch (error) {
//         console.error('Failed to fetch appointment:', error);
//       }
//     };

//     fetchAppointment();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAppointment(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`http://localhost:8000/api/appointments/${id}`, appointment, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       navigate(`/dashboard/${id}`);
//     } catch (error) {
//       console.error('Failed to update appointment:', error);
//     }
//   };

//   const goBack = () => {
//     window.location.href = `/dashboard/${id}`;
//   };

//   return (
//     <Container size="sm">
//       <Text align="center" size="xl">Update Appointment</Text>
//       <form onSubmit={handleSubmit}>
//         <TextInput
//           label="Status"
//           name="status"
//           value={appointment.status || ''}
//           onChange={handleChange}
//           required
//           fullwidth="true" 
//           style={{ marginBottom: '20px' }}
//         />
//         <TextInput
//           label="Appointment Date"
//           type="datetime-local"
//           name="appointmentDate"
//           value={appointment.appointmentDate || ''}
//           onChange={handleChange}
//           required
//           fullwidth="true" 
//           style={{ marginBottom: '20px' }}
//         />
//         <TextInput
//           label="Service Name"
//           name="serviceName"
//           value={appointment.serviceName || ''}
//           onChange={handleChange}
//           required
//           fullwidth="true" 
//           style={{ marginBottom: '20px' }}
//         />
//         <TextInput
//           label="Service Duration"
//           name="serviceDuration"
//           value={appointment.serviceDuration || ''}
//           onChange={handleChange}
//           required
//           fullwidth="true" 
//           style={{ marginBottom: '20px' }}
//         />
//         <TextInput
//           label="Service Price"
//           name="servicePrice"
//           value={appointment.servicePrice || ''}
//           onChange={handleChange}
//           required
//           fullwidth="true" 
//           style={{ marginBottom: '20px' }}
//         />
//         <TextInput
//           label="Service Description"
//           name="serviceDescription"
//           value={appointment.serviceDescription || ''}
//           onChange={handleChange}
//           required
//           fullwidth="true" 
//           style={{ marginBottom: '20px' }}
//         />
      
        
    
//         <Button
//           type="submit"
//           fullwidth="true" 
//           variant="outline"
//           color="blue"
//           style={{ marginTop: '20px' }}
//         >
//           Update Appointment
//         </Button>
//         <Button
//         fullwidth="true" 
//         variant="outline"
//         color="gray"
//         onClick={goBack}
//         style={{ marginTop: '20px' }}
//       >
//         Back to Dashboard
//       </Button>
//       </form>
//     </Container>
//   );
// }

// export default UpdateAppointment;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextInput, Button, Container, Title, Paper, Select } from "@mantine/core";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    appointmentDate: "",
    status: "",
    serviceName: "",
    serviceDuration: "",
    servicePrice: "",
    serviceDescription: ""
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/appointments/${id}`);
        setAppointment(response.data);
        console.log("Appointment data:", response.data);
        setFormData({
          appointmentDate: response.data.appointment_date,
          status: response.data.status,
          serviceName: response.data.service_name,
          serviceDuration: response.data.service_duration,
          servicePrice: response.data.service_price,
        });
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/appointments/${id}`, formData);
      navigate("/admin");
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container size={700}>
      <Title order={1}>Update Appointment</Title>
      <Paper withBorder padding="xl">
        <form onSubmit={handleUpdate}>
          <TextInput
            label="Appointment Date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
            data={["Scheduled", "Completed", "Cancelled"]}
            required
          />
          <TextInput
            label="Service Name"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Service Duration"
            name="serviceDuration"
            value={formData.serviceDuration}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Service Price"
            name="servicePrice"
            value={formData.servicePrice}
            onChange={handleChange}
            required
          />
          <Button type="submit" fullWidth mt="md">
            Update Appointment
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateAppointment;
