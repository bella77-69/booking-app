import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Container, Text, Button, List, ListItem, Paper } from '@mantine/core';
import { Card, Text, Button, Container, Title, Paper } from "@mantine/core";
import classes from "./dashboard.module.css";

function Dashboard() {
  const [appointments, setAppointments] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8000/api/appointments/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.appointments);
        console.log(response.data.appointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleBookAppointment = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/book-appointment/${userId}`);
  };

  const handleUpdateAppointment = (id) => {
    navigate(`/update-appointment/${id}`);
  };

  const handleDeleteAppointment = async (id) => {
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
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
      console.log(`Appointment with id ${id} deleted`);
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  return (
    <Container size={700} className={classes.wrapper}>
       {appointments.map((appointment, index) => (
        <>
        <h2 key={index}>Your Appointments:</h2>
    
        
  
      <Card size={700} className={classes.wrapper}>
       
          <Paper key={index} style={{ marginBottom: "15px", padding: "15px" }}>
            {/* <Avatar size="lg" radius="lg" src="https://i.pravatar.cc/300" /> */}

            <Text>Service: {appointment.description}</Text>
            <Text>
              Date: {new Date(appointment.appointment_date).toLocaleString()}
            </Text>
            <Text>Status: {appointment.status}</Text>
            <Button
              fullWidth
              variant="light"
              radius="xl"
              size="md"
              onClick={() => handleUpdateAppointment(appointment.id)}
              style={{ marginTop: "10px" }}
            >
              Update Appointment
            </Button>
            <Button
              fullWidth
              variant="default"
              radius="xl"
              size="md"
              onClick={() => handleDeleteAppointment(appointment.id)}
              style={{ marginTop: "10px" }}
            >
              Delete Appointment
            </Button>
          </Paper>
        
        <Button
          variant="default"
          radius="xl"
          size="md"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={{ marginTop: "20px" }}
        >
          Logout
        </Button>
      </Card>
      </>
      ))}
    </Container>
    // <Container size="sm">
    //   <Text align="center" size="xl">Welcome to Dashboard</Text>
    //   <Button
    //     fullWidth
    //     variant="outline"
    //     color="red"
    //     onClick={() => {
    //       localStorage.removeItem('token');
    //       window.location.href = '/login';
    //     }}
    //     style={{ marginTop: '20px' }}
    //   >
    //     Logout
    //   </Button>
    //   <Button
    //     fullWidth
    //     variant="outline"
    //     color="blue"
    //     onClick={handleBookAppointment}
    //     style={{ marginTop: '20px' }}
    //   >
    //     Book Appointment
    //   </Button>
    //   <Text align="center" size="lg" style={{ marginTop: '20px' }}>Your Appointments:</Text>
    //   <List style={{ marginTop: '20px' }}>
    //     {appointments.map((appointment, index) => (
    //       <Paper key={index} style={{ marginBottom: '15px', padding: '15px' }}>
    //         {/* <ListItem>
    //           <Text>User Id: {appointment.user_id}</Text>
    //         </ListItem> */}
    //         <ListItem>
    //           <Text>Description: {appointment.description}</Text>
    //         </ListItem>
    //         <ListItem>
    //           <Text>Appointment Date: {new Date(appointment.appointment_date).toLocaleString()}</Text>
    //         </ListItem>
    //         <ListItem>
    //           <Text>Appointment Status: {appointment.status}</Text>
    //         </ListItem>
    //         <Button
    //           fullWidth
    //           variant="outline"
    //           color="orange"
    //           onClick={() => handleUpdateAppointment(appointment.id)}
    //           style={{ marginTop: '10px' }}
    //         >
    //           Update Appointment
    //         </Button>
    //         <Button
    //           fullWidth
    //           variant="outline"
    //           color="red"
    //           onClick={() => handleDeleteAppointment(appointment.id)}
    //           style={{ marginTop: '10px' }}
    //         >
    //           Delete Appointment
    //         </Button>
    //       </Paper>
    //     ))}
    //   </List>
    // </Container>
  );
}

export default Dashboard;
