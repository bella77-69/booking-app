const express = require('express');
const { getAppointment, getAppointmentById, createAppointment, updateAppointmentController } = require('../controllers/appointment.controller');
const router = express.Router();

router.get('/', getAppointment);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', updateAppointmentController);

module.exports = router;
