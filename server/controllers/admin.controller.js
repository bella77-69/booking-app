const jwt = require("jsonwebtoken");
const {
  getAllAppointments,
} = require("../models/admin.model");

const getAppointment = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAppointment,
};
