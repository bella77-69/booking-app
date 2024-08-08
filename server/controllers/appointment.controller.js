const {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  addAppointment,
  updateAppointment,
  clearAppointmentUserInfo,
  getAllAvailableAppointments,
  populateAppointments,
  getServiceById,
  checkAvailability,
  updateTimeSlots,
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

const createAppointment = async (req, res) => {
  const { user_id, service_id, appointment_date, appointment_time } = req.body;

  try {
    // Get the duration of the service
    const service = await getServiceById(service_id);
    if (!service) {
      return res.status(400).send('Service not found.');
    }

    const serviceDuration = service.service_duration; // e.g., 60 minutes
    const appointmentEndTime = calculateEndTime(appointment_time, serviceDuration);

    // Check if the time slot is available
    const isAvailable = await checkAvailability(appointment_date, appointment_time, appointmentEndTime);
    if (!isAvailable) {
      return res.status(400).send('Appointment time is already booked or does not exist.');
    }

    // Book the appointment and update affected time slots
    const result = await addAppointment(user_id, service_id, appointment_date, appointment_time, appointmentEndTime);
    await updateTimeSlots(appointment_date, appointment_time, appointmentEndTime, user_id, service_id);

    if (result.affectedRows === 0) {
      return res.status(400).send('Failed to book the appointment.');
    }

    res.status(200).send('Appointment booked successfully.');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Helper function to calculate end time
const calculateEndTime = (startTime, durationMinutes) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const end = new Date();
  end.setHours(hours, minutes);
  end.setMinutes(end.getMinutes() + durationMinutes);
  return `${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
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
      throw new Error("Invalid appointment ID");
    }
    
    const updatedDetails = req.body;
    const result = await updateAppointment(id, updatedDetails);

    if (result.affectedRows === 0) {
      return res.status(404).send("Appointment not found or no changes made.");
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

//populate appointments
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
  deleteController,
  populateAppointmentsController,
  getAvailableTimeSlots
};
