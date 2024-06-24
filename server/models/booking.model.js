const db = require('../config/db.config');

const getAllBookings = async () => {
    const [rows] = await db.execute('SELECT * FROM booked_appointments');
    return rows;
    };

const getAllAvailableSlots = async () => {
    const [rows] = await db.execute('SELECT * FROM available_slots');
    return rows;
}


const findBookingById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM booked_appointments WHERE id = ?', [id]);
    if (rows.length === 0) throw new Error('Booking not found');
    return rows[0];
};

const getBookingsForUser = async (userId) => {
    const [rows] = await db.execute('SELECT * FROM booked_appointments WHERE user_id = ?', [userId]);
    return rows;
};

const addBooking = async (booking) => {
    const { slot_id, user_id } = booking;
    const [result] = await db.execute(
        'INSERT INTO booked_appointments (slot_id, user_id) VALUES (?, ?)',
        [slot_id, user_id]
    );
    return {
        id: result.insertId,
        slot_id,
        user_id,
    };
};

const updateBooking = async (id, booking) => {
    const { slot_id } = booking;
    await db.execute(
        'UPDATE booked_appointments SET slot_id = ? WHERE id = ?',
        [slot_id, id]
    );
};

const deleteBooking = async (id) => {
    await db.execute('DELETE FROM booked_appointments WHERE id = ?', [id]);
};

module.exports = {
    getAllBookings,
    getAllAvailableSlots,
    findBookingById,
    getBookingsForUser,
    addBooking,
    updateBooking,
    deleteBooking,
};
