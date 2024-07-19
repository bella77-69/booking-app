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

const createAppointment = async (req, res) => {
  try {
    const { user_id, appointment_date, service_id } = req.body;
    const status = "Scheduled"; // Default status

    // Call the model function
    const newAppointment = await addAppointment(
      user_id,
      appointment_date,
      status,
      service_id
    );

    res
      .status(201)
      .json({ message: "Appointment created successfully", newAppointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: error.message });
  }
};

const allowedStatuses = ["Scheduled", "Confirmed", "Completed", "Cancelled"];

const updateAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, service_id, appointment_date, status } = req.body;

    // Validate input
    if (!user_id || !service_id || !appointment_date || !status) {
      return res.status(400).send("All fields are required");
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).send("Invalid status value");
    }

    // Update the appointment details in the database
    const result = await updateAppointment(id, {
      user_id,
      service_id,
      appointment_date,
      status,
    });

    if (result.affectedRows === 0) {
      return res.status(404).send("Appointment not found");
    }

    // Fetch the updated appointment details
    const updatedAppointment = await getAppointmentsForUser(id);

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the appointment");
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
