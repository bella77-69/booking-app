const express = require("express");
const {
  getTime,
  getTimeById,
  getTimeByUserId,
  createTime,
  updateAppointmentTime,
  deleteAppointmentTime,
} = require("../controllers/times.controller.js");
const router = express.Router();

router.get("/", getTime);
router.get("/:id", getTimeById);
router.get("/:user_id", getTimeByUserId);
router.post("/:id", createTime);
router.put("/:id", updateAppointmentTime);
router.delete("/:id", deleteAppointmentTime);

module.exports = router;
