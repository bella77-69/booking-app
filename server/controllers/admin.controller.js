const {
  getAllAppointments,
  populateAppointments,
} = require("../models/admin.model");


const getAppointment = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//populate appointments
const populateAppointmentsController = async (req, res) => {
  try {
    await populateAppointments();
    res.status(200).send("Appointments populated successfully.");
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

module.exports = {
  getAppointment,
  populateAppointmentsController,
};
