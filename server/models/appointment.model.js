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


// const findAppointmentById = async (id) => {
//   const query = `
//     SELECT 
//       a.appointment_id,
//       a.user_id,
//       u.username,
//       s.service_name,
//       s.service_price,
//       s.service_duration,
//       a.appointment_date,
//       a.status
//     FROM 
//       Appointments a
//     JOIN 
//       Users u ON a.user_id = u.user_id
//     JOIN 
//       Services s ON a.service_id = s.service_id
//     WHERE a.appointment_id = ?
//   `;
//   const [rows] = await db.execute(query, [id]);
//   if (rows.length === 0) throw new Error("Appointment not found");
//   return rows[0];
// };

// const getAppointmentsForUser = async (user_id) => {
//   const [rows] = await db.execute(
//     "SELECT * FROM appointments WHERE user_iD = ?",
//     [user_id]
//   );
//   return rows;
// };
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


// const addAppointment = async (userId, appointmentDate, status, serviceId) => {
//   try {
//     const [result] = await db.execute(
//       "INSERT INTO appointments (userId, appointmentDate, status, serviceId) VALUES (?, ?, ?, ?)",
//       [userId, appointmentDate, status, serviceId]
//     );

//     return { appointmentID: result.insertId };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };


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


const updateAppointment = async (id, appointmentDate, status, serviceName, serviceDuration, servicePrice) => {
  const formattedDate = moment(appointmentDate).format("YYYY-MM-DD HH:mm:ss");
  const [result] = await db.execute(
    "UPDATE appointments SET appointmentDate = ?, status = ?, serviceName = ?, serviceDuration = ?, servicePrice = ? WHERE id = ?",
    [formattedDate, status, serviceName, serviceDuration, servicePrice, id]
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
