const db = require("../config/db.config");
const moment = require("moment");

const getAllAppointments = async () => {
  const [rows] = await db.execute("SELECT * FROM appointments");
  return rows;
};

const findAppointmentById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM appointments WHERE id = ?",
    [id]
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
  id,

  appointmentDate,
  status,

) => {
  const formattedDate = moment(appointmentDate).format("YYYY-MM-DD HH:mm:ss");
  const [result] = await db.execute(
    "UPDATE appointments SET  appointmentDate = ?, status = ? WHERE id = ?",
    [ formattedDate, status, id]
  );
  if (result.affectedRows === 0) throw new Error("Appointment not found");
  return { id };
};

const deleteAppointment = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM appointments WHERE id = ?",
    [id]
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
