const {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  getAllAvailableAppointments,
  updateAppointmentStatus,
  clearAppointmentUserInfo,
  findAppointmentByDateAndTime,
} = require("../models/appointment.model");

//get all appointments
const getAppointment = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get appointment by id
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

//get appointments by user id
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

//create appointment
const createAppointment = async (req, res) => {
  try {
    const { user_id, service_id, appointment_date, start_time, end_time } =
      req.body;

    if (!appointment_date || !start_time) {
      return res
        .status(400)
        .json({ error: "Date and start time are required" });
    }

    // Check if an appointment already exists for the given date and time
    const existingAppointment = await findAppointmentByDateAndTime(
      appointment_date,
      start_time
    );

    const newDetails = {
      user_id,
      service_id,
      appointment_date,
      start_time,
      end_time,
      status: "booked", // Set status to "booked"
    };

    if (existingAppointment) {
      // Update existing appointment
      const result = await updateAppointmentStatus(
        existingAppointment.id,
        newDetails
      );

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Appointment not found or no changes made." });
      }

      return res.status(200).send("Appointment updated successfully.");
    } 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get available time slots
const getAvailableTimeSlots = async (req, res) => {
  try {
    const availableAppointments = await getAllAvailableAppointments();
    res.status(200).json(availableAppointments);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};


//update appointment
const updateAppointmentController = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid appointment ID" });
    }

    const updatedDetails = req.body;

    const result = await updateAppointmentStatus(id, updatedDetails);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Appointment not found or no changes made." });
    }

    res.status(200).send("Appointment updated successfully.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete appointment
const deleteController = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error("Invalid appointment ID");
    }

    const result = await clearAppointmentUserInfo(id);

    if (result.affectedRows === 0) {
      return res.status(404).send("Appointment not found.");
    }

    res.status(200).send("User information cleared successfully.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAppointment,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  getAvailableTimeSlots,
  updateAppointmentController,
  deleteController,
};
