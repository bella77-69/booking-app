const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/users.routes');
const appointmentRoutes = require('./routes/appointment.route');
// const postRoutes = require('./routes/post.routes');

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/appointments', appointmentRoutes);
// app.use('/api/posts', postRoutes);

app.listen(port, () => console.log(`Server is running on ${port}`));
