// // import React, { useState, useEffect } from 'react';

// // const BookingPage = () => {
// //   const [formData, setFormData] = useState({
// //     appointment_date: '',
// //     appointment_time: '',
// //     user_id: '',
// //   });

// //   const [responseMessage, setResponseMessage] = useState('');
// //   const [bookings, setBookings] = useState([]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await fetch('http://localhost:8000/api/booking', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();
// //       if (response.ok) {
// //         setResponseMessage('Booking successful!');
// //         fetchBookings();  // Fetch the updated list of bookings
// //       } else {
// //         setResponseMessage(`Booking failed: ${data.message}`);
// //       }
// //     } catch (error) {
// //       setResponseMessage(`Booking failed: ${error.message}`);
// //     }
// //   };

// //   const fetchBookings = async () => {
// //     try {
// //       const response = await fetch('http://localhost:8000/api/times', {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       const data = await response.json();
// //       if (response.ok) {
// //         setBookings(data);
// //       } else {
// //         console.error('Failed to fetch bookings:', data.message);
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch bookings:', error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBookings();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Book an Appointment</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>
// //             User ID:
// //             <input
// //               type="text"
// //               name="user_id"
// //               value={formData.user_id}
// //               onChange={handleChange}
// //               required
// //             />
// //           </label>
// //         </div>
// //         <div>
// //           <label>
// //             Date:
// //             <input
// //               type="date"
// //               name="appointment_date"
// //               value={formData.appointment_date}
// //               onChange={handleChange}
// //               required
// //             />
// //           </label>
// //         </div>
// //         <div>
// //           <label>
// //             Time:
// //             <input
// //               type="time"
// //               name="appointment_time"
// //               value={formData.appointment_time}
// //               onChange={handleChange}
// //               required
// //             />
// //           </label>
// //         </div>
// //         <button type="submit">Book</button>
// //       </form>
// //       {responseMessage && <p>{responseMessage}</p>}

// //       <h2>All Bookings</h2>
// //       <ul>
// //         {bookings.map((booking) => (
// //           <li key={booking.id}>
// //             User ID: {booking.user_id}, Date: {booking.appointment_date}, Time: {booking.appointment_time}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default BookingPage;
// // src/pages/Booking/BookingPage.jsx

// // src/pages/Booking/BookingPage.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Container, Title, TextInput, Paper, Card, Text } from '@mantine/core';
// import { useNavigate } from 'react-router-dom';
// import classes from './bookingPage.module.css';

// const BookingPage = () => {
//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     slot_id: '',
//     description: '',
//     appointment_date: '',
//   });
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/booking/slot');
//         // Filter out slots that are already booked (user_id is not null)
//         const filteredSlots = response.data.filter(slot => slot.user_id === null);
//         setSlots(filteredSlots);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchAppointments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('userId');
//         const response = await axios.get(
//           `http://localhost:8000/api/appointments/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setAppointments(response.data.appointments);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchSlots();
//     fetchAppointments();
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(`http://localhost:8000/api/appointments/${userId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAppointments([...appointments, response.data]);
//       navigate('/dashboard');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleDeleteAppointment = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:8000/api/appointments/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAppointments((prevAppointments) =>
//         prevAppointments.filter((appointment) => appointment.id !== id)
//       );
//       console.log(`Appointment with id ${id} deleted`);
//     } catch (error) {
//       console.error('Failed to delete appointment:', error);
//     }
//   };

//   return (
//     <Container size={700} className={classes.wrapper}>
//       <Title order={1}>Book Appointment</Title>
//       <Paper style={{ padding: '20px', marginBottom: '20px' }}>
//         <form onSubmit={handleFormSubmit}>
//           {/* <div className={classes.formControl}>
//             <label htmlFor="slot_id">Select a Slot:</label>
//             <select
//               id="slot_id"
//               name="slot_id"
//               value={formData.slot_id}
//               onChange={handleInputChange}
//               className={classes.selectInput}
//             >
//               <option value="">Select a slot</option>
//               {slots.map((slot) => (
//                 <option key={slot.id} value={slot.id}>
//                   {slot.time}
//                 </option>
//               ))}
//             </select>
//           </div> */}
//           <div className={classes.formControl}>
//             <label htmlFor="description">Description:</label>
//             <TextInput
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//               placeholder="Appointment description"
//               className={classes.textInput}
//             />
//           </div>
//           <div className={classes.formControl}>
//             <label htmlFor="appointment_date">Appointment Date:</label>
//             <TextInput
//               id="appointment_date"
//               name="appointment_date"
//               type="date"
//               value={formData.appointment_date}
//               onChange={handleInputChange}
//               required
//               className={classes.textInput}
//             />
//           </div>
//           <Button
//             type="submit"
//             fullWidth
//             variant="default"
//             radius="xl"
//             size="md"
//             style={{ marginTop: '20px' }}
//           >
//             Book Appointment
//           </Button>
//         </form>
//       </Paper>

//       {appointments.length > 0 && (
//         <div>
//           <h2>Your Appointments:</h2>
//           {appointments.map((appointment) => (
//             <Card key={appointment.id} size={700} className={classes.card}>
//               <Paper style={{ marginBottom: '15px', padding: '15px' }}>
//                 <Text>Service: {appointment.description}</Text>
//                 <Text>
//                   Date: {new Date(appointment.appointment_date).toLocaleDateString()}
//                 </Text>
//                 <Button
//                   fullWidth
//                   variant="light"
//                   radius="xl"
//                   size="md"
//                   onClick={() => handleDeleteAppointment(appointment.id)}
//                   style={{ marginTop: '10px' }}
//                 >
//                   Delete Appointment
//                 </Button>
//               </Paper>
//             </Card>
//           ))}
//         </div>
//       )}

//       <Button
//         variant="default"
//         radius="xl"
//         size="md"
//         onClick={() => navigate('/dashboard')}
//         style={{ marginTop: '20px' }}
//       >
//         Go back to Dashboard
//       </Button>
//     </Container>
//   );
// };

// export default BookingPage;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Text,
  Select,
  Button,
  Notification,
  TextInput,
} from '@mantine/core';

function BookingPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBookAppointment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/api/appointments/${userId}`,
        {
          description,
          appointment_date: appointmentDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      navigate(`/dashboard/${id}`);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  const goBack = () => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <Container size="sm">
      <Text align="center" size="xl">
        Book Appointment
      </Text>
      {error && (
        <Notification color="red" title="Error">
          {error}
        </Notification>
      )}
      <Select
        label="Appointment Type"
        placeholder="Select appointment type"
        value={description}
        onChange={(value) => setDescription(value)}
        data={[
          { label: 'Classic Lashes Full Set - 2 hours', value: 'Classic Lashes Full Set' },
          { label: 'Classic Lashes Fill - 1.5 hours', value: 'Classic Lashes Fill'},
          { label: 'Hybrid Lashes Full Set - 2.5 hours', value: 'Hybrid Lashes Full Set' },
          { label: 'Hybrid Lashes Fill - 2 hours', value: 'Hybrid Lashes Fill' },
          { label: 'Volume Lashes Full Set - 3 hours', value: 'Volume Lashes Full Set'},
          { label: 'Volume Lashes Fill - 2.5 hours', value: 'Volume Lashes Fill' },
          { label: 'Russian Lashes Full Set - 3.5 hours', value: 'Russian Lashes Full Set' },
          { label: 'Russian Lashes Fill 3 hours', value: 'Russian Lashes Fill'},
        ]}
        style={{ marginTop: '20px' }}
      />
      <TextInput
        label="Appointment Date"
        placeholder="Enter appointment date"
        type="datetime-local"
        value={appointmentDate}
        onChange={(event) => setAppointmentDate(event.currentTarget.value)}
        required
        style={{ marginTop: '20px' }}
      />
      <Button
        fullWidth
        variant="outline"
        color="blue"
        onClick={handleBookAppointment}
        loading={loading}
        disabled={loading}
        style={{ marginTop: '20px' }}
      >
        Book Appointment
      </Button>
      <Button
        fullWidth
        variant="outline"
        color="gray"
        onClick={goBack}
        style={{ marginTop: '20px' }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
}

export default BookingPage;
