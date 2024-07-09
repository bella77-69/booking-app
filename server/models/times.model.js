const db = require('../config/db.config');

const getAllTimes = async () => {
    const [rows] = await db.execute('SELECT * FROM available_slots');
    return rows;
    };

const findTimeById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM available_slots WHERE id = ?', [id]);
    if (rows.length === 0) throw new Error('Booking not found');
    return rows[0];
};

const findTimeByUserId = async (userId) => {
    const [rows] = await db.execute('SELECT * FROM available_slots WHERE user_id = ?', [userId]);
    return rows;
};

const addTime = async (booking) => {
    const { appointment_date, appointment_time, user_id } = booking;
    const [result] = await db.execute(
        'INSERT INTO available_slots (appointment_date, appointment_time, user_id) VALUES (?, ?, ?)',
        [appointment_date, appointment_time, user_id]
    );
    return {
        id: result.insertId,
        appointment_date,
        appointment_time,
        user_id,
    };
};

const updateTime = async (id, time) => {
    const { appointment_date, appointment_time, user_id } = time;
    await db.execute(
        'UPDATE available_slots SET appointment_date = ?, appointment_time = ?, user_id = ?  WHERE id = ?',
        [appointment_date, appointment_time, user_id, id]
    );
};

const deleteTime = async (id) => {
    await db.execute('DELETE FROM available_slots WHERE id = ?', [id]);
};

module.exports = {
    getAllTimes,
    findTimeById,
    findTimeByUserId,
    addTime,
    updateTime,
    deleteTime,
};
