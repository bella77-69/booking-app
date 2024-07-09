const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.routes');
const appointmentRoutes = require('./routes/appointment.route');
const bookingRoutes = require('./routes/booking.route');
const timesRoutes = require('./routes/times.routes');
// const postRoutes = require('./routes/post.routes');

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/times', timesRoutes);
// app.use('/api/posts', postRoutes);

app.listen(port, () => console.log(`Server is running on ${port}`));
