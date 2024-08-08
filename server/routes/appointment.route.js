const express = require("express");
const router = express.Router();
const {
  getAppointment,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  updateAppointmentController,
  deleteController,
  populateAppointmentsController,
  getAvailableTimeSlots,
} = require("../controllers/appointment.controller");

router.get("/", getAppointment);
router.get("/:id", getAppointmentById);
router.get("/user/:user_id", getAppointmentsByUserId);
router.get("/available/open", getAvailableTimeSlots);
router.post("/", createAppointment);
router.post("/populate", populateAppointmentsController);
router.put("/:id", updateAppointmentController);
router.delete("/delete/:id", deleteController);

module.exports = router;
