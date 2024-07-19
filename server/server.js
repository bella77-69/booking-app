const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.routes');
const appointmentRoutes = require('./routes/appointment.route');
const serviceRoutes = require('./routes/services.route');
const adminRoutes = require('./routes/admin.route');

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => console.log(`Server is running on ${port}`));
