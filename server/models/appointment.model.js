const db = require("../config/db.config");

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

const getAppointmentsForUser = async (user_id) => {
  const [rows] = await db.execute(
    `SELECT 
        Users.full_name AS user_name,
        Users.email AS user_email,
        Services.service_name,
        Services.service_price,
        Services.service_duration,
        Services.description,
        Appointments.appointment_date,
        Appointments.status
     FROM 
        Appointments
     JOIN 
        Users ON Appointments.user_id = Users.user_id
     JOIN 
        Services ON Appointments.service_id = Services.service_id
     WHERE 
        Users.user_id = ?`,
    [user_id]
  );
  return rows;
};

const addAppointment = async (user_id, appointment_date, status, service_id) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO appointments (user_id, appointment_date, status, service_id) VALUES (?, ?, ?, ?)",
      [user_id, appointment_date, status, service_id]
    );
    return { appointmentID: result.insertId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAppointment = async (id, details) => {
  const { user_id, service_id, appointment_date, status } = details;
  const [result] = await db.execute(`
      UPDATE appointments
      SET 
          user_id = ?,
          service_id = ?,
          appointment_date = ?,
          status = ?,
          updated_at = NOW()
      WHERE id = ?
  `, [user_id, service_id, appointment_date, status, id]);

  return result;
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
