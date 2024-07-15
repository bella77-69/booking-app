const db = require("../config/db.config");
const moment = require("moment");

const getAllAppointments = async () => {
    const [rows] = await db.execute(`
        SELECT 
          a.id as appointment_id,
          u.username as username,
          u.email as email,
          u.full_name as full_name,
          u.phone_number as phone_number,
          s.service_name as service_name,
          s.service_price as service_price,
            s.service_duration as service_duration,
          a.appointment_date,
          a.status
        FROM appointments a
        JOIN users u ON a.user_id = u.user_id
        JOIN services s ON a.service_id = s.service_id
    `);
    return rows;
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


module.exports = {
  getAllAppointments,
};
