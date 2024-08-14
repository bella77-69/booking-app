import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Text, Button, Container, Title, Paper, Loader } from "@mantine/core";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const AdminDashboard = () => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAppointments = await axios.get("http://localhost:8000/api/admin");
        setAppointment(responseAppointments.data);
        console.log("Appointments data:", responseAppointments.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader size="xl" />;
  }


  // Function to combine date and time into a Date object
  const combineDateAndTime = (dateString, timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date(dateString);
    date.setHours(hours, minutes);
    return date;
  };

  // Transforming appointment data for the calendar
  const events = appointment.map(appointments => {
    const start = combineDateAndTime(appointments.appointment_date, appointments.start_time);
    
    // Assuming the appointment duration is 1 hour for simplicity
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    return {
      id: appointments.booking_id,
      title: `${appointments.service_name} - ${appointments.full_name}`,
      start,
      end,
      allDay: false,
      resource: appointments
    };
  });

  return (
    <Container size={700}>
      <Title order={1}>Admin Dashboard</Title>
      <div>
        <h2>Booked Appointments</h2>
        {appointment.length === 0 ? (
          <Text>No booked appointments available.</Text>
        ) : (
          <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              min={new Date(2024, 0, 1, 9, 0)} // Start time at 9:00 AM
              max={new Date(2024, 0, 1, 18, 0)} // End time at 6:00 PM
              onSelectEvent={event => navigate(`/admin/appointment-details/${event.id}`)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminDashboard;
