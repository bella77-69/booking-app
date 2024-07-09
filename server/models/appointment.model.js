const db = require("../config/db.config");
const moment = require("moment");

const getAllAppointments = async () => {
  const [rows] = await db.execute("SELECT * FROM appointments");
  return rows;
};

const findAppointmentById = async (appointmentId) => {
  const [rows] = await db.execute(
    "SELECT * FROM appointments WHERE appointmentID = ?",
    [appointmentId]
  );
  if (rows.length === 0) throw new Error("Appointment not found");
  return rows[0];
};

const getAppointmentsForUser = async (userId) => {
  const [rows] = await db.execute(
    "SELECT * FROM appointments WHERE userID = ?",
    [userId]
  );
  return rows;
};

const addAppointment = async (userId, appointmentDate, status, serviceId) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO appointments (userId, appointmentDate, status, serviceId) VALUES (?, ?, ?, ?)",
      [userId, appointmentDate, status, serviceId]
    );

    return { appointmentID: result.insertId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAppointment = async (
  appointmentId,
  userId,
  appointmentDate,
  status,
  serviceId
) => {
  const formattedDate = moment(appointmentDate).format("YYYY-MM-DD HH:mm:ss");
  const [result] = await db.execute(
    "UPDATE appointments SET userId = ?, appointmentDate = ?, status = ?, serviceId = ? WHERE appointmentId = ?",
    [userId, formattedDate, status, serviceId, appointmentId]
  );
  if (result.affectedRows === 0) throw new Error("Appointment not found");
  return { appointmentId };
};

const deleteAppointment = async (appointmentId) => {
  const [result] = await db.execute(
    "DELETE FROM appointments WHERE appointmentId = ?",
    [appointmentId]
  );
  if (result.affectedRows === 0) throw new Error("Appointment not found");
};

module.exports = {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
