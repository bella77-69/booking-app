const db = require("../config/db.config");

//get all appointments
const getAllAppointments = async () => {
  const [rows] = await db.execute("SELECT * FROM appointments");
  return rows;
};

//get appointment by id
const findAppointmentById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM appointments WHERE id = ?", [
    id,
  ]);
  if (rows.length === 0) throw new Error("Appointment not found");
  return rows[0];
};

//get appointments for a user
const getAppointmentsForUser = async (user_id) => {
  const [rows] = await db.execute(
    `SELECT 
    appointments.id AS id,
        Users.full_name AS user_name,
        Users.email AS user_email,
        Services.service_name,
        Services.service_price,
        Services.service_duration,
        Services.description,
        appointments.appointment_date,
        appointments.start_time,
        appointments.status
     FROM 
        appointments
     JOIN 
        Users ON appointments.user_id = Users.user_id
     JOIN 
        Services ON appointments.service_id = Services.service_id
     WHERE 
        Users.user_id = ?`,
    [user_id]
  );
  return rows;
};

/* 
create appointment 
*/
const findAppointmentByDateAndTime = async (appointment_date, start_time) => {
  const [rows] = await db.execute(
    "SELECT * FROM appointments WHERE appointment_date = ? AND start_time = ?",
    [appointment_date, start_time]
  );
  return rows.length > 0 ? rows[0] : null;
};

//update appointment status
const updateAppointmentStatus = async (id, details) => {
  try {
    const {
      user_id,
      service_id,
      appointment_date,
      start_time,
      end_time,
      status,
    } = details;

    // Construct the SQL query dynamically based on provided details
    const updateFields = [];
    const updateValues = [];

    if (user_id !== undefined) {
      updateFields.push('user_id = ?');
      updateValues.push(user_id);
    }
    if (service_id !== undefined) {
      updateFields.push('service_id = ?');
      updateValues.push(service_id);
    }
    if (appointment_date !== undefined) {
      updateFields.push('appointment_date = ?');
      updateValues.push(appointment_date);
    }
    if (start_time !== undefined) {
      updateFields.push('start_time = ?');
      updateValues.push(start_time);
    }
    if (end_time !== undefined) {
      updateFields.push('end_time = ?');
      updateValues.push(end_time);
    }
    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    updateValues.push(id);

    const [result] = await db.execute(
      `UPDATE appointments SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
/*
 end of create appointment
*/

//get available time slots
const getAllAvailableAppointments = async () => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM appointments
      WHERE status = 'available'
      ORDER BY appointment_date, start_time
    `);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

//delete request to delete an appointment
const clearAppointmentUserInfo = async (id) => {
  try {
    const [result] = await db.execute(
      `
      UPDATE appointments
      SET user_id = NULL, service_id = NULL, status = 'available'
      WHERE id = ?
    `,
      [id]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  findAppointmentByDateAndTime,
  updateAppointmentStatus,
  getAllAvailableAppointments,
  clearAppointmentUserInfo,
};