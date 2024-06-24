// const jwt = require('jsonwebtoken');
// const {
//   getAllAppointments,
//   findAppointmentById,
//   getAppointmentsForUser,
//   addAppointment: addAppointmentDb,
//   updateAppointment: updateAppointmentDb,
// } = require('../models/appointment.model');
// const { findUserById } = require('../models/user.model');

// const parseToken = (authHeader, res) => {
//   if (!authHeader) {
//     res.status(403).send('Header does not exist');
//     return '';
//   }
//   return authHeader.split(' ')[1];
// };

// const getAppointment = async (req, res) => {
//   try {
//     const appointment = await getAllAppointments();
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAppointmentById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     if (isNaN(id)) {
//       throw new Error('Invalid appointment ID');
//     }

//     const appointment = await findAppointmentById(id);
//     if (!appointment) {
//       throw new Error('Appointment not found');
//     }

//     const user = await findUserById(appointment.user_id);
//     if (!user) {
//       throw new Error('User not found');
//     }

//     res.json({ ...appointment, email: user.email });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAppointmentsByUserId = async (req, res) => {
//   try {
//     const userId = parseInt(req.params.userId, 10);
//     const appointments = await getAppointmentsForUser(userId);

//     res.json({
//       userId,
//       appointments,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const createAppointment = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = parseToken(authHeader, res);
//     if (!token) {
//       return;
//     }

//     const secretKey = process.env.SECRET_KEY;
//     const decodedUser = jwt.verify(token, secretKey);

//     const userId = parseInt(req.params.userId, 10);
//     if (decodedUser.id !== userId) {
//       return res.status(403).json({ error: 'Unauthorized user' });
//     }

//     const { description, appointment_date } = req.body;
//     if (!description || !appointment_date) {
//       return res.status(400).json({ error: 'Description and appointment date are required.' });
//     }

//     const newAppointment = {
//       description,
//       appointment_date,
//       user_id: userId,
//     };

//     const addedAppointment = await addAppointmentDb(newAppointment);
//     res.status(201).json(addedAppointment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateAppointmentController = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     const incomingAppointment = req.body;

//     const post = await findAppointmentById(id);
//     if (!post) {
//       res.status(404).json({ error: 'Appointment not found, try again' });
//       return;
//     }

//     if (!incomingAppointment.description || !incomingAppointment.appointment_date) {
//       res.status(400).json({ error: 'Appointment data incorrect, try again!!' });
//       return;
//     }

//     await updateAppointmentDb(id, incomingAppointment);
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getAppointment,
//   getAppointmentById,
//   createAppointment,
//   updateAppointmentController,
//   getAppointmentsByUserId,
// };
const jwt = require('jsonwebtoken');
const {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  addAppointment: addAppointmentDb,
  updateAppointment: updateAppointmentDb,
  deleteAppointment
} = require('../models/appointment.model');
const { findUserById } = require('../models/user.model');

const parseToken = (authHeader, res) => {
  if (!authHeader) {
    res.status(403).send('Authorization header does not exist');
    return '';
  }
  return authHeader.split(' ')[1];
};

const getAppointment = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error('Invalid appointment ID');
    }

    const appointment = await findAppointmentById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const user = await findUserById(appointment.user_id);
    if (!user) {
      throw new Error('User not found');
    }

    res.json({ ...appointment, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    const appointments = await getAppointmentsForUser(userId);
    res.json({
      userId,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAppointment = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    if (!token) {
      return res.status(403).json({ error: 'Token is missing' });
    }

    const secretKey = process.env.SECRET_KEY;
    const decodedUser = jwt.verify(token, secretKey);

    const userId = parseInt(req.params.userId, 10);
    if (decodedUser.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized user' });
    }

    const { description, appointment_date } = req.body;
    if (!description || !appointment_date) {
      return res.status(400).json({ error: 'Description and appointment date are required.' });
    }

    const newAppointment = {
      description,
      appointment_date,
      user_id: userId,
      status: 'booked',
    };

    const addedAppointment = await addAppointmentDb(newAppointment);
    res.status(201).json(addedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppointmentController = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error('Invalid appointment ID');
    }

    const incomingAppointment = req.body;
    if (!incomingAppointment.description || !incomingAppointment.appointment_date) {
      return res.status(400).json({ error: 'Description and appointment date are required.' });
    }

    const appointment = await findAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await updateAppointmentDb(id, incomingAppointment);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAppointmentController = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error('Invalid appointment ID');
    }

    const appointment = await findAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await deleteAppointment(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAppointment,
  getAppointmentById,
  createAppointment,
  updateAppointmentController,
  getAppointmentsByUserId,
  deleteAppointmentController,
};
