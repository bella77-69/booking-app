import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Text, Title, Paper, Loader, Button, Group } from "@mantine/core";
import { IconCalendar, IconClock, IconCurrencyDollar, IconChevronLeft } from "@tabler/icons-react"; 
import classes from "./UserAppointmentDetails.module.css"; 

const UserAppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/appointments/${id}`
        );
        setAppointment(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointment details.");
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  if (loading) {
    return <Loader size="xl" />;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  if (!appointment) {
    return <Text>Appointment not found.</Text>;
  }

  const user_id = localStorage.getItem("userId");

  const backToDashboard = () => {
    navigate(`/dashboard/${user_id}`);
  };

  const adminUpdateAppointment = (id) => {
    navigate(`/admin/update-appointment/${id}`);
  };

  const deleteAppointment = (id) => {
    navigate(`/delete-appointment/${user_id}/${appointment.id}`);
  };

  return (
    <Container size={700} className={classes.container}  >
      <Title order={2} className={classes.title}>
        Appointment Details
      </Title>
      <Paper shadow="md" padding="xl" className={classes.paper}>
        <Group position="apart" align="center" mb="md">
          <Text size="lg" weight={500} className={classes.serviceName}>
            {appointment.service_name}
          </Text>
          <IconCalendar size={24} className={classes.icons} />
        </Group>
        <Group mb="sm">
          <IconClock size={20} className={classes.icons}/>
          <Text className={classes.services}>Date: {new Date(appointment.appointment_date).toLocaleDateString()}</Text>
        </Group>
        <Group mb="sm">
          <IconClock size={20} className={classes.icons} />
          <Text className={classes.services}>Time: {appointment.start_time}</Text>
        </Group>
        <Group mb="sm">
          <IconCurrencyDollar size={20} className={classes.icons}/>
          <Text className={classes.services}>Price: {appointment.service_price}</Text>
        </Group>
        <Text mb="sm" className={classes.services}>Service Duration: {appointment.service_duration}</Text>
        <Text mb="sm" className={classes.services}>Status: {appointment.status}</Text>

        <Group position="center" spacing="md" mt="xl">
          <Button
            lefticon={<IconChevronLeft size={20} />}
            variant="gradient"
            gradient={{ from: 'pink', to: 'grey' }}
            onClick={backToDashboard}
            className={classes.button}
          >
            Back to Dashboard
          </Button>
          <Button
            color="blue"
            onClick={() => adminUpdateAppointment(appointment.id)}
            className={classes.button}
          >
            Update Appointment
          </Button>
          <Button
            color="red"
            onClick={() => deleteAppointment(appointment.id)}
            className={classes.button}
          >
            Delete Appointment
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default UserAppointmentDetails;