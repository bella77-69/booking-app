// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Card, Text, Button, Container, Title, Paper } from "@mantine/core";
// import classes from "./dashboard.module.css";

// function Dashboard() {
//   const { id } = useParams();
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const user_id = localStorage.getItem("userId");

//         const response = await axios.get(
//           `http://localhost:8000/api/appointments/user/${user_id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setAppointments(response.data.appointments);

//         console.log("Appointments data:", response.data.appointments);
//       } catch (error) {
//         console.error("Failed to fetch appointments:", error);
//       }
//     };

//     fetchAppointments();
//   }, [id]);

//   const handleBookAppointment = () => {
//     const user_id = localStorage.getItem("userId");
//     navigate(`/book-appointment/${user_id}`);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   };

//   const user_id = localStorage.getItem("userId");
//   return (
//     <Container size={700} className={classes.wrapper}>
//       <Title order={1} style={{textAlign: "center"}}>Dashboard</Title>
//       <Button
//         fullWidth
//         variant="default"
//         radius="xl"
//         size="md"
//         onClick={handleBookAppointment}
//         style={{ marginTop: "20px" }}
//       >
//         Book Appointment
//       </Button>

//       {appointments.length > 0 && (
//         <div>
//           <h2>Upcoming Appointments:</h2>
//           {appointments.map((appointment, index) => (
//             <Card key={index} size={700} className={classes.card}>
//               <Paper style={{ marginBottom: "15px", padding: "15px" }}>
//                 <Text>Service: {appointment.service_name}</Text>
//                 <Text>Description: {appointment.description}</Text>
//                 <Text>Price: {appointment.service_price}</Text>

//                 <Text>Date: {formatDate(appointment.appointment_date)}</Text>
//                 <Text>Time: {appointment.start_time}</Text>
//                   <Text>Duration: {appointment.service_duration}</Text>
//                   <Text>Status: {appointment.status}</Text>
//                 <br />
//                 {/* <Button
//                   variant="outline"
//                   color="blue"
//                   onClick={() =>
//                     navigate(`/update-appointment/${appointment.id}`)
//                   }
//                 >
//                   Update Appointment
//                 </Button> */}
//                 <Button
//                   variant="outline"
//                   color="red"
//                   onClick={() =>
//                     navigate(`/delete-appointment/${user_id}/${appointment.id}`)
//                   }
//                 >
//                   Request to Delete
//                 </Button>
//               </Paper>
//             </Card>
//           ))}
//         </div>
//       )}
//     </Container>
//   );
// }

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Title, Loader, Text, Button } from "@mantine/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../pages/Admin/calendarStyles.css"; // Assuming you have custom styles
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

  // Function to combine date and time into a Date object
  const combineDateAndTime = (dateString, timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date(dateString);
    date.setHours(hours, minutes);
    return date;
  };

  // Transforming appointment data for the calendar
  const events = appointments.map((appointment) => {
    const start = combineDateAndTime(
      appointment.appointment_date,
      appointment.start_time
    );

    // Assuming the appointment duration is 1 hour for simplicity
    const end = new Date(start.getTime() + 60 * 60 * 1000);

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

  return (
    <Container size={700} className={classes.wrapper}>
      <Title order={1} style={{ textAlign: "center" }}>
        Dashboard
      </Title>
      <Button
        className={classes.button}
        fullWidth
        variant="gradient"
        gradient={{ from: "pink", to: "grey" }}
        radius="xl"
        size="md"
        onClick={handleBookAppointment}
        style={{ marginTop: "20px" }}
      >
        Book Appointment
      </Button>

      {appointments.length > 0 ? (
        <div>
          <h2>Your Appointments</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, marginTop: "20px" }}
            min={new Date(2024, 0, 1, 9, 0)} // Start time at 9:00 AM
            max={new Date(2024, 0, 1, 18, 0)} // End time at 6:00 PM
            onSelectEvent={(event) =>
              navigate(`/user/appointment-details/${event.id}`)
            }
          />
        </div>
      ) : (
        <Text>No appointments found.</Text>
      )}
    </Container>
  );
};

export default Dashboard;
