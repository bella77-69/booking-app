// const db = require('../config/db.config');

// const getAllAppointments = async () => {
//   const [rows] = await db.execute('SELECT * FROM appointments');
//   return rows;
// };

// const findAppointmentById = async (id) => {
//   const [rows] = await db.execute('SELECT * FROM appointments WHERE appointment_id = ?', [id]);
//   if (rows.length === 0) throw new Error('Appointment not found');
//   return rows[0];
// };

// const getAppointmentsForUser = async (userId) => {
//   const [rows] = await db.execute('SELECT * FROM appointments WHERE user_id = ?', [userId]);
//   return rows;
// };

// const addAppointment = async (appointment) => {
//   const { description, appointment_date, user_id } = appointment;
//   const [result] = await db.execute(
//     'INSERT INTO appointments (description, appointment_date, user_id) VALUES (?, ?, ?)',
//     [description, appointment_date, user_id]
//   );
//   return {
//     appointment_id: result.insertId,
//     description,
//     appointment_date,
//     user_id,
//   };
// };

// const updateAppointment = async (id, appointment) => {
//   const { description, appointment_date } = appointment;
//   await db.execute('UPDATE appointments SET description = ?, appointment_date = ? WHERE appointment_id = ?', [description, appointment_date, id]);
// };

// module.exports = {
//   getAllAppointments,
//   findAppointmentById,
//   getAppointmentsForUser,
//   addAppointment,
//   updateAppointment,
// };
const db = require('../config/db.config');

const getAllAppointments = async () => {
  const [rows] = await db.execute('SELECT * FROM appointments');
  return rows;
};

const findAppointmentById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM appointments WHERE id = ?', [id]);
  if (rows.length === 0) throw new Error('Appointment not found');
  return rows[0];
};

const getAppointmentsForUser = async (userId) => {
  const [rows] = await db.execute('SELECT * FROM appointments WHERE user_id = ?', [userId]);
  return rows;
};

const addAppointment = async (appointment) => {
  const { description, appointment_date, user_id, status } = appointment;
  const [result] = await db.execute(
    'INSERT INTO appointments (description, appointment_date, user_id, status) VALUES (?, ?, ?, ?)',
    [description, appointment_date, user_id, status]
  );
  return {
    id: result.insertId,
    description,
    appointment_date,
    user_id,
    status,
  };
};

const updateAppointment = async (id, appointment) => {
  const { description, appointment_date } = appointment;
  await db.execute(
    'UPDATE appointments SET description = ?, appointment_date = ? WHERE id = ?',
    [description, appointment_date, id]
  );
};

const deleteAppointment = async (id) => {
  await db.execute('DELETE FROM appointments WHERE id = ?', [id]);
};

module.exports = {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};

