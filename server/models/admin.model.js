const db = require("../config/db.config");

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
          a.appointment_time,
          a.status
        FROM appointments a
        JOIN users u ON a.user_id = u.user_id
        JOIN services s ON a.service_id = s.service_id
    `);
    return rows;
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
            INSERT IGNORE INTO appointments (appointment_date, start_time, end_time, status)
            VALUES (@current_date, @current_time, ADDTIME(@current_time, '02:00:00'), 'available');
            SET @current_time = ADDTIME(@current_time, '02:00:00');
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
  populateAppointments,
};
