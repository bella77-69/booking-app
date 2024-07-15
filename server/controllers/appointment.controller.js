const jwt = require("jsonwebtoken");
const {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../models/appointment.model");

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
      throw new Error("Invalid appointment ID");
    }

    const appointment = await findAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppointmentsByUserId = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id, 10);
    if (isNaN(user_id)) {
      throw new Error("Invalid user ID");
    }

    const appointments = await getAppointmentsForUser(user_id);
    res.json({
      user_id,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const parseToken = (authHeader, res) => {
  if (!authHeader) {
    res.status(403).send("Authorization header does not exist");
    return "";
  }
  return authHeader.split(" ")[1];
};

// const createAppointment = async (userId, appointmentDate, serviceName, serviceDuration, servicePrice, serviceDescription) => {
//   try {
//     const query = `
//       INSERT INTO appointments (userId, appointmentDate, status, createdAt, serviceName, serviceDuration, servicePrice, serviceDescription)
//       VALUES (?, ?, 'available', CURRENT_TIMESTAMP, ?, ?, ?, ?)
//     `;
//     const values = [userId, appointmentDate, serviceName, serviceDuration, servicePrice, serviceDescription];
//     await db.execute(query, values);
//     return true; // or return the inserted appointment ID or success message
//   } catch (error) {
//     console.error('Error creating appointment:', error);
//     throw error;
//   }
// };

const createAppointment = async (req, res) => {
  try {
    const { user_id, appointment_date, service_id } = req.body;
    const status = 'Scheduled'; // Default status

    // Call the model function
    const newAppointment = await addAppointment(user_id, appointment_date, status, service_id);

    res.status(201).json({ message: "Appointment created successfully", newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: error.message });
  }
};


const updateAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentDate, status, serviceName, serviceDuration, servicePrice} = req.body;

    const updatedAppointment = await updateAppointment(
      id,
      appointmentDate,
      status,
      serviceName,
      serviceDuration,
      servicePrice,
    );

    res.status(200).json({
      message: "Appointment updated successfully",
      updatedAppointment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteAppointmentController = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid appointment ID" });
    }

    await deleteAppointment(id);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAppointment,
  getAppointmentById,
  createAppointment,
  getAppointmentsByUserId,
  updateAppointmentController,
  deleteAppointmentController,
};
