// const db = require("../config/db.config");

// const getAllAppointments = async () => {
//   const [rows] = await db.execute("SELECT * FROM appointments");
//   return rows;
// };

// const findAppointmentById = async (id) => {
//   const [rows] = await db.execute(
//     "SELECT * FROM appointments WHERE id = ?",
//     [id]
//   );
//   if (rows.length === 0) throw new Error("Appointment not found");
//   return rows[0];
// };

// const getAppointmentsForUser = async (user_id) => {
//   const [rows] = await db.execute(
//     `SELECT 
//         Users.full_name AS user_name,
//         Users.email AS user_email,
//         Services.service_name,
//         Services.service_price,
//         Services.service_duration,
//         Services.description,
//         Appointments.appointment_date,
//         Appointments.status
//      FROM 
//         Appointments
//      JOIN 
//         Users ON Appointments.user_id = Users.user_id
//      JOIN 
//         Services ON Appointments.service_id = Services.service_id
//      WHERE 
//         Users.user_id = ?`,
//     [user_id]
//   );
//   return rows;
// };

// const addAppointment = async (user_id, appointment_date, status, service_id) => {
//   try {
//     const [result] = await db.execute(
//       "INSERT INTO appointments (user_id, appointment_date, status, service_id) VALUES (?, ?, ?, ?)",
//       [user_id, appointment_date, status, service_id]
//     );
//     return { appointmentID: result.insertId };
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// const updateAppointment = async (id, details) => {
//   const { user_id, service_id, appointment_date, status } = details;
//   const [result] = await db.execute(`
//       UPDATE appointments
//       SET 
//           user_id = ?,
//           service_id = ?,
//           appointment_date = ?,
//           status = ?,
//           updated_at = NOW()
//       WHERE id = ?
//   `, [user_id, service_id, appointment_date, status, id]);

//   return result;
// };

// const deleteAppointment = async (id) => {
//   const [result] = await db.execute(
//     "DELETE FROM appointments WHERE id = ?",
//     [id]
//   );
//   if (result.affectedRows === 0) throw new Error("Appointment not found");
// };

// module.exports = {
//   getAllAppointments,
//   findAppointmentById,
//   getAppointmentsForUser,
//   addAppointment,
//   updateAppointment,
//   deleteAppointment,
// };
// // const db = require("../config/db.config");

// // const getAllAppointments = async () => {
// //   const [rows] = await db.execute("SELECT * FROM appointments");
// //   return rows;
// // };

// // const findAppointmentById = async (id) => {
// //   const [rows] = await db.execute("SELECT * FROM appointments WHERE id = ?", [id]);
// //   if (rows.length === 0) throw new Error("Appointment not found");
// //   return rows[0];
// // };

// // const getAppointmentsForUser = async (user_id) => {
// //   const [rows] = await db.execute(
// //     `SELECT 
// //         Users.full_name AS user_name,
// //         Users.email AS user_email,
// //         Services.service_name,
// //         Services.service_price,
// //         Services.service_duration,
// //         Services.description,
// //         Appointments.appointment_date,
// //         Appointments.appointment_time,
// //         Appointments.status
// //      FROM 
// //         Appointments
// //      JOIN 
// //         Users ON Appointments.user_id = Users.user_id
// //      JOIN 
// //         Services ON Appointments.service_id = Services.service_id
// //      WHERE 
// //         Users.user_id = ?`,
// //     [user_id]
// //   );
// //   return rows;
// // };

// // const addAppointment = async (user_id, appointment_date, appointment_time, status, service_id) => {
// //   try {
// //     const [result] = await db.execute(
// //       "INSERT INTO appointments (user_id, appointment_date, appointment_time, status, service_id) VALUES (?, ?, ?, ?, ?)",
// //       [user_id, appointment_date, appointment_time, status, service_id]
// //     );
// //     return { appointmentID: result.insertId };
// //   } catch (error) {
// //     throw new Error(error.message);
// //   }
// // };

// // const updateAppointment = async (id, details) => {
// //   const { user_id, service_id, appointment_date, appointment_time, status } = details;
// //   const [result] = await db.execute(`
// //       UPDATE appointments
// //       SET 
// //           user_id = ?,
// //           service_id = ?,
// //           appointment_date = ?,
// //           appointment_time = ?,
// //           status = ?,
// //           updated_at = NOW()
// //       WHERE id = ?
// //   `, [user_id, service_id, appointment_date, appointment_time, status, id]);

// //   return result;
// // };

// // const deleteAppointment = async (id) => {
// //   const [result] = await db.execute("DELETE FROM appointments WHERE id = ?", [id]);
// //   if (result.affectedRows === 0) throw new Error("Appointment not found");
// // };

// // const getAvailableAppointments = async (date) => {
// //   const [rows] = await db.execute(
// //     "SELECT appointment_date, appointment_time FROM appointments WHERE status = 'available' AND appointment_date = ?",
// //     [date]
// //   );
// //   return rows;
// // };

// // const bookAppointment = async (user_id, service_id, date, time) => {
// //   const [result] = await db.execute(`
// //     UPDATE appointments
// //     SET user_id = ?, service_id = ?, status = 'booked'
// //     WHERE appointment_date = ? AND appointment_time = ? AND status = 'available'
// //   `, [user_id, service_id, date, time]);

// //   return result;
// // };

// // module.exports = {
// //   getAllAppointments,
// //   findAppointmentById,
// //   getAppointmentsForUser,
// //   addAppointment,
// //   updateAppointment,
// //   deleteAppointment,
// //   getAvailableAppointments,
// //   bookAppointment,
// // };
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
        Appointments.appointment_time,
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

// const addAppointment = (appointment, callback) => {
//   const { user_id, service_id, appointment_date, appointment_time, status } = appointment;
//   const query = `INSERT INTO appointments (user_id, service_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)`;
//   const values = [user_id, service_id, appointment_date, appointment_time, status];

//   db.query(query, values, (error, results) => {
//     if (error) {
//       return callback(error);
//     }
//     callback(null, results);
//   });
// };

const getAvailableSlots = async (date) => {
  try {
    const query = date
      ? `
        SELECT appointment_date, appointment_time
        FROM appointments
        WHERE appointment_date = ? AND status = 'available'
        ORDER BY appointment_time
      `
      : `
        SELECT appointment_date, appointment_time
        FROM appointments
        WHERE status = 'available'
        ORDER BY appointment_date, appointment_time
      `;
      
    const params = date ? [date] : [];

    const [rows] = await db.query(query, params);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};


const addAppointment  = async (user_id, service_id, appointment_date, appointment_time) => {
  try {
    const [result] = await db.query(`
      UPDATE appointments
      SET user_id = ?, service_id = ?, status = 'booked'
      WHERE appointment_date = ? AND appointment_time = ? AND status = 'available'
    `, [user_id, service_id, appointment_date, appointment_time]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};


const checkAppointmentExists = async (appointment_date, appointment_time) => {
  const [rows] = await db.execute(
    "SELECT * FROM appointments WHERE appointment_date = ? AND appointment_time = ?",
    [appointment_date, appointment_time]
  );
  return rows.length > 0;
};


const bookAppointment = async (user_id, service_id, appointment_date, appointment_time) => {
  const [result] = await db.execute(`
    UPDATE appointments
    SET user_id = ?, service_id = ?, status = 'booked'
    WHERE appointment_date = ? AND appointment_time = ? AND status = 'available'
  `, [user_id, service_id, appointment_date, appointment_time]);

  if (result.affectedRows === 0) {
    throw new Error('Appointment time is already booked or does not exist.');
  }
};

const updateAppointment = async (id, details) => {
  const { user_id, service_id, appointment_date, appointment_time, status } = details;
  const [result] = await db.execute(`
      UPDATE appointments
      SET 
          user_id = ?,
          service_id = ?,
          appointment_date = ?,
          appointment_time = ?,
          status = ?,
          updated_at = NOW()
      WHERE id = ?
  `, [user_id, service_id, appointment_date, appointment_time, status, id]);

  return result;
};


const deleteAppointment = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM appointments WHERE id = ?",
    [id]
  );
  if (result.affectedRows === 0) throw new Error("Appointment not found");
};

// New functions for booking functionality
const getAvailableAppointments = async (date) => {
  const [rows] = await db.execute(`
    SELECT appointment_date, appointment_time
    FROM appointments
    WHERE status = 'available' AND appointment_date = ?, appointment_time = ?
  `, [date]);
  return rows;
};

const populateAppointments = async () => {
  await db.query(`DROP PROCEDURE IF EXISTS PopulateAppointments`);

  const createProcedureSql = `
    CREATE PROCEDURE PopulateAppointments()
    BEGIN
      DECLARE date_cursor DATE;
      DECLARE cur_day CHAR(10);
      SET @start_date = '2024-08-01';
      SET @end_date = '2024-12-31';

      SET @current_date = @start_date;

      WHILE @current_date <= @end_date DO
        SET cur_day = DAYNAME(@current_date);

        IF cur_day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday') THEN
          SET @start_time = '09:00:00';
          SET @end_time = '18:00:00';
        ELSEIF cur_day = 'Saturday' THEN
          SET @start_time = '10:00:00';
          SET @end_time = '16:00:00';
        ELSE
          SET @start_time = NULL;
          SET @end_time = NULL;
        END IF;

        IF @start_time IS NOT NULL THEN
          SET @current_time = @start_time;
          WHILE @current_time < @end_time DO
            INSERT IGNORE INTO appointments (appointment_date, appointment_time, status)
            VALUES (@current_date, @current_time, 'available');
            SET @current_time = ADDTIME(@current_time, '01:00:00');
          END WHILE;
        END IF;

        SET @current_date = DATE_ADD(@current_date, INTERVAL 1 DAY);
      END WHILE;
    END;
  `;

  await db.query(createProcedureSql);
  await db.query(`CALL PopulateAppointments()`);
};

module.exports = {
  getAllAppointments,
  findAppointmentById,
  getAppointmentsForUser,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getAvailableAppointments,
  populateAppointments,
  bookAppointment,
  checkAppointmentExists,
  getAvailableSlots,
};
