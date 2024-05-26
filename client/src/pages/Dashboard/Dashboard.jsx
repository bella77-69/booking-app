import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/appointment') // replace with your actual API endpoint
            .then(response => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    console.log("Appointments:", appointments); // Log appointments to check its value

    return (
        <div>
            <h1>dashboard page</h1>
            <h2>Upcoming Appointments</h2>
            {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                    <div key={index}>
                        <p>{appointment.date} - {appointment.time}</p>
                    </div>
                ))
            ) : (
                <p>No appointments found</p>
            )}
            <button onClick={() => {/* code to book an appointment */}}>Book an Appointment</button>
        </div>
    );
};

export default Dashboard;
