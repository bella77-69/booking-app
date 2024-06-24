const {   getAllBookings,
    getAllAvailableSlots,
    findBookingById,
    getBookingsForUser,
    addBooking,
    updateBooking,
    deleteBooking } = require('../models/booking.model');


const getBooking = async (req, res) => {
    try {
        const bookings = await getAllBookings();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookingSlot = async (req, res) => {
    try {
        const slots = await getAllAvailableSlots();
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getBookingById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error('Invalid booking ID');
        }

        const booking = await findBookingById(id);
        if (!booking) {
            throw new Error('Booking not found');
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookingsByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            throw new Error('Invalid user ID');
        }

        const bookings = await getBookingsForUser(userId);
        res.json({
            userId,
            bookings,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBooking = async (req, res) => {
    try {
        const { slot_id, user_id} = req.body;
        const newBooking = await addBooking({ slot_id, user_id});
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateBookingController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error('Invalid booking ID');
        }

        const incomingBooking = req.body;
        await updateBooking(id, incomingBooking);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBookingController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error('Invalid booking ID');
        }

        await deleteBooking(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getBooking,
    getBookingSlot,
    getBookingById,
    getBookingsByUserId,
    createBooking,
    updateBookingController,
    deleteBookingController,
};
