const express = require("express");
const {
  getAppointment,
} = require("../controllers/admin.controller");
const router = express.Router();

router.get("/", getAppointment);

module.exports = router;
