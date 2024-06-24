const express = require('express');
const { getBooking, getBookingSlot, getBookingById, getBookingsByUserId, createBooking, updateBookingController, deleteBookingController } = require('../controllers/booking.controller');
const router = express.Router();

router.get('/', getBooking);
router.get('/slot', getBookingSlot)
router.get('/:userId', getBookingsByUserId);
router.get('/:id', getBookingById);
router.post('/:userId', createBooking);
router.put('/:id', updateBookingController);
router.delete('/:id', deleteBookingController);

module.exports = router;