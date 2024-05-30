const jwt = require('jsonwebtoken');
const { getAllAppointments, findAppointmentById, addAppointment: addAppointmentDb, updateAppointment: updateAppointmentDb } = require('../models/appointment.model');
const { findUserById } = require('../models/user.model');

const parseToken = (authHeader, res) => {
  if (!authHeader) {
    res.status(403).send('Header does not exist');
    return '';
  }
  return authHeader.split(' ')[1];
};

const getAppointment = async (req, res) => {
  try {
    const appointment = await getAllAppointments();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const appointment = await findAppointmentById(id);
    const user = await findUserById(appointment.userId);
    res.json({ ...appointment, email: user.email });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createAppointment = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const secretKey = process.env.SECRET_KEY;
    const decodedUser = jwt.verify(token, secretKey);
    const user_id = decodedUser.id;
    const incomingAppointment = req.body;

    // Validate incoming appointment data
    if (
      incomingAppointment.description &&
      incomingAppointment.appointment_date &&
      incomingAppointment.created_at &&
      incomingAppointment.user_id
    ) {
      // Add the appointment to the database
      await addAppointmentDb(incomingAppointment, user_id);
      res.status(200).json({ success: true });
    } else {
      // If required fields are missing, return a 400 Bad Request error
      res.status(400).json({ error: 'Appointment data incomplete or incorrect, please provide all required fields.' });
    }
  } catch (error) {
    // Handle JWT verification errors or other unexpected errors
    res.status(401).json({ error: 'You are unauthorized to perform this action or an unexpected error occurred.' });
  }
};

const updateAppointmentController = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const incomingAppointment = req.body;

    const post = await findAppointmentById(id);
    if (!post) {
      res.status(404).json({ error: 'Post not found, try again' });
      return;
    }

    if (
      !incomingAppointment.description ||
      !incomingAppointment.appointment_date
    ) {
      res.status(400).json({ error: 'Post data incorrect, try again!!' });
      return;
    }

    await updateAppointmentDb(id, incomingAppointment);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
  getAppointment,
  getAppointmentById,
  createAppointment,
  updateAppointmentController,
};
