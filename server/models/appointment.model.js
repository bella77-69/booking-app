const db = require('../config/db.config');

const getAllAppointments = async () => {
  const [rows] = await db.execute('SELECT * FROM appointments');
  return rows;
};

const findAppointmentById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM appointments WHERE appointment_id = ?', [id]);
  if (rows.length === 0) throw new Error('Post not found');
  return rows[0];
};

const addAppointment = async (appointment, user_id) => {
  const { description, appointment_date, created_at } = appointment;
  await db.execute('INSERT INTO appointments (description, appointment_date, created_at, user_id) VALUES (?, ?, ?, ?, ?)', [description, appointment_date, created_at, user_id]);
};

const updateAppointmentModel = async (appointment_id, appointment) => {
  const {  description, appointment_date } = appointment;
  await db.execute('UPDATE appointments SET description = ?, appointment_date = ? WHERE appointment_id = ?', [description, appointment_date, appointment_id]);
};

module.exports = {
  getAllAppointments,
  findAppointmentById,
  addAppointment,
  updateAppointment: updateAppointmentModel,
};
