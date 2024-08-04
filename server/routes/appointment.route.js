const express = require("express");
const router = express.Router();
const {
  getAppointment,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  updateAppointmentController,
  deleteAppointmentController,
  populateAppointmentsController,
  getAvailableTimeSlots,
} = require("../controllers/appointment.controller");

router.get("/", getAppointment);
router.get("/:id", getAppointmentById);
router.get("/user/:user_id", getAppointmentsByUserId);
router.get('/available/open', getAvailableTimeSlots);
router.post("/", createAppointment);
router.post("/populate", populateAppointmentsController);

router.put("/:id", updateAppointmentController);
router.delete("/:id", deleteAppointmentController);




module.exports = router;
