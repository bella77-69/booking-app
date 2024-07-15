const db = require("../config/db.config");
const moment = require("moment");

const getAllServices = async () => {
  const [rows] = await db.execute("SELECT * FROM services");
  return rows;
};

const findServiceById = async (service_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM services WHERE service_id = ?",
    [service_id]
  );
  if (rows.length === 0) throw new Error("Service not found");
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

const updateAppointment = async (id, appointmentDate, status, serviceName, serviceDuration, servicePrice, serviceDescription) => {
  const formattedDate = moment(appointmentDate).format("YYYY-MM-DD HH:mm:ss");
  const [result] = await db.execute(
    "UPDATE appointments SET appointmentDate = ?, status = ?, serviceName = ?, serviceDuration = ?, servicePrice = ?, serviceDescription = ? WHERE id = ?",
    [formattedDate, status, serviceName, serviceDuration, servicePrice, serviceDescription, id]
  );
  if (result.affectedRows === 0) throw new Error("Appointment not found");
  return { id };
};


module.exports = {
  getAllServices,
  findServiceById,
  getAppointmentsForUser,
  addAppointment,
  updateAppointment,
};
