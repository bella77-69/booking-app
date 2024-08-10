const express = require("express");
const {
  getAppointment,
  populateAppointmentsController,
} = require("../controllers/admin.controller");
const router = express.Router();

router.get("/", getAppointment);
router.post("/populate", populateAppointmentsController);

module.exports = router;
