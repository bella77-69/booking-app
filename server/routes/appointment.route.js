const express = require('express');
const { getAppointment, getAppointmentsByUserId, createAppointment, updateAppointmentController, deleteAppointmentController } = require('../controllers/appointment.controller');
const router = express.Router();

router.get('/', getAppointment);
router.get('/:userId', getAppointmentsByUserId);
router.post('/:userId', createAppointment);
router.put('/:id', updateAppointmentController);
router.delete('/:id', deleteAppointmentController);

module.exports = router;
