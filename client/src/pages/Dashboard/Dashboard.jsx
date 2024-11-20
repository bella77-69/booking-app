import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Title, Loader, Text, Button } from "@mantine/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import classes from "./dashboard.module.css";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:8000/api/appointments/user/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <Loader size="xl" />;
  }

  const combineDateAndTime = (dateString, timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date(dateString);
    date.setHours(hours, minutes);
    return date;
  };

  const events = appointments.map((appointment) => {
    const start = combineDateAndTime(
      appointment.appointment_date,
      appointment.start_time
    );

    const end = new Date(start.getTime() + 60 * 60 * 1000); // Assume 1 hour

    return {
      id: appointment.id,
      title: `${appointment.service_name}`,
      start,
      end,
      allDay: false,
      resource: appointment,
    };
  });

  const handleBookAppointment = () => {
    const user_id = localStorage.getItem("userId");
    navigate(`/book-appointment/${user_id}`);
  };

  // Custom messages for the calendar
  const messages = {
    agenda: {
      noEventsInRange: "You have no appointments scheduled during this time.",
    },
  };

  return (
    <Container className={classes.wrapper}>
      <Title order={1} style={{ textAlign: "center", margin: "1rem" }}>
        Dashboard
      </Title>
      <Button
        className={classes.button}
        variant="filled"
        color="pink"
        size="sm"
        radius="xl"
        onClick={handleBookAppointment}
      >
        Book Appointment
      </Button>

      {appointments.length > 0 ? (
        <div className={classes["calendar-container"]}>
          <h2>Your Appointments</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={["agenda"]}
            defaultView="agenda"
            onSelectEvent={(event) =>
              navigate(`/user/appointment-details/${event.id}`)
            }
            messages={messages}
          />
        </div>
      ) : (
        <Text>No appointments found.</Text>
      )}
    </Container>
  );
};

export default Dashboard;

