const db = require("../config/db.config");

//get all appointments
const getAllAppointments = async () => {
  const [rows] = await db.execute("SELECT * FROM appointments");
  return rows;
};

//get appointment by id
const findAppointmentById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM appointments WHERE id = ?",
    [id]
  );
  if (rows.length === 0) throw new Error("Appointment not found");
  return rows[0];
};

//get appointments for a user 
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

// post request to create an appointment
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

//TODO:
//get available time slots
const getAllAvailableAppointments = async () => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM appointments
      WHERE status = 'available'
      ORDER BY appointment_date, appointment_time
    `);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};


//TODO:
//put request to update an appointment
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

//TODO:
//delete request to delete an appointment
const deleteAppointment = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM appointments WHERE id = ?",
    [id]
  );
  if (result.affectedRows === 0) throw new Error("Appointment not found");
};

// post request to populate appointments
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
  populateAppointments,
  getAllAvailableAppointments,
};
