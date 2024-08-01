const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');


  // Get available appointments
  router.get('/', async (req, res) => {
    const { date } = req.query;
    try {
      const [rows] = await pool.query(`
        SELECT appointment_date, appointment_time
        FROM appointments
        WHERE status = 'available' AND appointment_date = ?
      `, [date]);
  
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

/// Populate appointments table
router.post('/populate', async (req, res) => {
    try {
      await pool.query(`DROP PROCEDURE IF EXISTS PopulateAppointments`);
  
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
  
      await pool.query(createProcedureSql);
      await pool.query(`CALL PopulateAppointments()`);
  
      res.status(200).send('Appointments populated successfully.');
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
  
  // Book an appointment
  router.post('/book', async (req, res) => {
    const { userId, serviceId, date, time } = req.body;
    try {
      const [result] = await pool.query(`
        UPDATE appointments
        SET user_id = ?, service_id = ?, status = 'booked'
        WHERE appointment_date = ? AND appointment_time = ? AND status = 'available'
      `, [userId, serviceId, date, time]);
  
      if (result.affectedRows === 0) {
        return res.status(400).send('Appointment time is already booked or does not exist.');
      }
  
      res.status(200).send('Appointment booked successfully.');
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
  
  module.exports = router;