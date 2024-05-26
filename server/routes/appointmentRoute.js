import express from 'express';
const router = express.Router();

//get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.json({ message: err });

    }
});

//get booking by id
router.get('/:id', (req, res) => {
    res.send('Get booking by id');
});

//create booking
router.post('/', (req, res) => {
    res.send('Create booking');
});

//update booking
router.put('/:id', (req, res) => {
    res.send('Update booking');
});

//delete booking
router.delete('/:id', (req, res) => {
    res.send('Delete booking');
});

//delete all bookings
router.delete('/', (req, res) => {
    res.send('Delete all bookings');
});

//get bookings by date
router.get('/date/:date', (req, res) => {
    res.send('Get bookings by date');
});

export default router;