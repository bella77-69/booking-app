const express = require("express");
const {
  getAppointment,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  updateAppointmentController,
  deleteAppointmentController,
} = require("../controllers/appointment.controller");
const router = express.Router();

router.get("/", getAppointment);
router.get("/:id", getAppointmentById);
router.get("/user/:user_id", getAppointmentsByUserId);
router.post("/create", createAppointment);
router.put("/:id", updateAppointmentController);
router.delete("/:id", deleteAppointmentController);

module.exports = router;
