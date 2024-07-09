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
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      throw new Error("Invalid user ID");
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

const parseToken = (authHeader, res) => {
  if (!authHeader) {
    res.status(403).send("Authorization header does not exist");
    return "";
  }
  return authHeader.split(" ")[1];
};

const createAppointment = async (req, res) => {
  try {
    const { userId, appointmentDate, status, serviceId } = req.body;

    // Ensure required fields are present
    if (!userId || !appointmentDate || !status || !serviceId) {
      return res
        .status(400)
        .json({
          error: "userId, appointmentDate, status, and serviceId are required.",
        });
    }

    // Call model function to create appointment
    const { id } = await addAppointment(
      userId,
      appointmentDate,
      status,
      serviceId
    );

    res
      .status(201)
      .json({ message: "Appointment created successfully", id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, appointmentDate, status, serviceId } = req.body;

    const updatedAppointment = await updateAppointment(
      id,
      userId,
      appointmentDate,
      status,
      serviceId
    );

    res
      .status(200)
      .json({
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
