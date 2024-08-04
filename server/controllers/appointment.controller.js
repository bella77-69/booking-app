const {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getAllAvailableAppointments,
  populateAppointments,
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
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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

//post request to create appointment
const createAppointment = async (req, res) => {
  const { user_id, service_id, appointment_date, appointment_time } = req.body;
  try {
    const result = await addAppointment(user_id, service_id, appointment_date, appointment_time);

    if (result.affectedRows === 0) {
      return res.status(400).send('Appointment time is already booked or does not exist.');
    }

    res.status(200).send('Appointment booked successfully.');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

//TODO:
//get available time slots
const getAvailableTimeSlots = async (req, res) => {
  try {
    const availableAppointments = await getAllAvailableAppointments();
    res.status(200).json(availableAppointments);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

//TODO:
//put request to update appointment
const updateAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, service_id, appointment_date, appointment_time, status } = req.body;

    if (!user_id || !service_id || !appointment_date || appointment_time || !status) {
      return res.status(400).send("All fields are required");
    }

    const result = await updateAppointment(id, { user_id, service_id, appointment_date, appointment_time, status });

    if (result.affectedRows === 0) {
      return res.status(404).send("Appointment not found");
    }

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

//TODO:
//delete request to delete appointment
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

const populateAppointmentsController = async (req, res) => {
  try {
    await populateAppointments();
    res.status(200).send('Appointments populated successfully.');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};


module.exports = {
  getAppointment,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  updateAppointmentController,
  deleteAppointmentController,
  populateAppointmentsController,
  getAvailableTimeSlots
};
