// const express = require("express");
// const {
//   getAppointment,
//   getAppointmentById,
//   getAppointmentsByUserId,
//   createAppointment,
//   updateAppointmentController,
//   deleteAppointmentController,
// } = require("../controllers/appointment.controller");
// const router = express.Router();

// router.get("/", getAppointment);
// router.get("/:id", getAppointmentById);
// router.get("/user/:user_id", getAppointmentsByUserId);
// router.post("/create", createAppointment);
// router.put("/:id", updateAppointmentController);
// router.delete("/:id", deleteAppointmentController);

// //router.post('/populate', populateAppointments);
// //router.post('/book, createAppointment);

// module.exports = router;
// // const express = require("express");
// // const {
// //   // getAppointment,
// //   getAppointmentById,
// //   getAppointmentsByUserId,
// //  //createAppointment,
// //   updateAppointmentController,
// //   deleteAppointmentController,
// //   getAvailableAppointmentsController,
// //   bookAppointmentController,
// // } = require("../controllers/appointment.controller");

// // const router = express.Router();

// // // router.get("/", getAppointment);
// // router.get("/", getAvailableAppointmentsController);
// // router.get("/:id", getAppointmentById);
// // router.get("/user/:user_id", getAppointmentsByUserId);
// // // router.post("/create", createAppointment);
// // router.put("/:id", updateAppointmentController);
// // router.delete("/:id", deleteAppointmentController);

// // router.post("/book", bookAppointmentController); // New route to book an appointment

// // module.exports = router;
const express = require("express");
const router = express.Router();
const {
  getAppointment,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  updateAppointmentController,
  deleteAppointmentController,
  getAvailableAppointmentsController,
  populateAppointmentsController,
  bookAppointmentController,
  getAvailableTimeSlots,
} = require("../controllers/appointment.controller");

router.get("/", getAppointment);
router.get("/:id", getAppointmentById);
router.get("/user/:user_id", getAppointmentsByUserId);
router.get('/available', getAvailableTimeSlots);
router.post("/", createAppointment);
router.put("/:id", updateAppointmentController);
router.delete("/:id", deleteAppointmentController);

// New routes
router.get("/available", getAvailableAppointmentsController);
router.post("/populate", populateAppointmentsController);
router.post("/book", bookAppointmentController);

module.exports = router;
