const {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  getServiceById,
  isTimeAvailable,
  addAppointment,
  updateAppointment,
  getAllAvailableAppointments,
  updateAppointmentStatus,
  clearAppointmentUserInfo,
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
  const { user_id, service_id, appointment_date, start_time } = req.body;

  try {
    // Fetch the service duration
    const service = await getServiceById(service_id);
    const service_duration = service.service_duration;

    // Calculate the end time
    const startTime = new Date(`1970-01-01T${start_time}Z`);
    const endTime = new Date(startTime.getTime() + service_duration * 60000);
    const end_time = endTime.toISOString().substr(11, 8); // Format HH:MM:SS

    // Check if the time slot is available
    const available = await isTimeAvailable(
      appointment_date,
      start_time,
      end_time
    );

    if (!available) {
      return res
        .status(400)
        .json({ message: "The selected time slot is not available." });
    }

    // Create the appointment
    const result = await addAppointment({
      user_id,
      service_id,
      appointment_date,
      start_time,
      end_time,
    });

    const appointmentId = result.insertId;

    // Update the status to 'booked'
    await updateAppointment(appointmentId, "booked");

    res.status(201).json({
      message: "Appointment created successfully.",
      appointmentId: appointmentId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the appointment." });
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
