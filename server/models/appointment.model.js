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
    Appointments.id AS id,
        Users.full_name AS user_name,
        Users.email AS user_email,
        Services.service_name,
        Services.service_price,
        Services.service_duration,
        Services.description,
        Appointments.appointment_date,
        Appointments.start_time,
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

/* create appointment */
// Function to get service details by ID
const getServiceById = async (service_id) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT service_duration FROM services WHERE service_id = ?
    `,
      [service_id]
    );

    if (rows.length === 0) {
      throw new Error("Service not found");
    }

    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

/* create appointment */
const isTimeAvailable = async (appointment_date, start_time, end_time) => {
  const query = `
    SELECT * FROM appointments 
    WHERE appointment_date = ? 
    AND (
      (start_time < ? AND end_time > ?) 
      OR (start_time < ? AND end_time > ?)
    )
    AND status = 'booked'
  `;
  const [rows] = await db.execute(query, [
    appointment_date,
    end_time,
    start_time,
    end_time,
    start_time,
  ]);
  return rows.length === 0; // returns true if no overlapping appointments
};

/* create appointment */
const addAppointment = async (appointment) => {
  const query = `
      INSERT INTO appointments (user_id, service_id, appointment_date, status, start_time, end_time)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    appointment.user_id,
    appointment.service_id,
    appointment.appointment_date,
    "booked",
    appointment.start_time,
    appointment.end_time,
  ];
  const [result] = await db.execute(query, values);
  return result;
};

/* create appointment */
const updateAppointment = async (id, status) => {
  const query = `
    UPDATE appointments
    SET status = ?
    WHERE id = ?
  `;
  const values = [status, id];
  const [result] = await db.execute(query, values);
  if (result.affectedRows === 0) {
    throw new Error('Failed to update appointment status');
  }
};

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
  getServiceById,
  isTimeAvailable,
  addAppointment,
  updateAppointment,
  getAllAvailableAppointments,
  updateAppointmentStatus,
  clearAppointmentUserInfo,
};
