import * as  dbConn from "../config/db.config.js";

export const getAllBookings = async (req, res) => {
    try {
      const [result] = await dbConn.promise().query('SELECT * FROM appointments');
      res.json(result);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving bookings.',
      });
    }
  };
export const getBookingById = (req, res) => {
    dbConn.query(
        `SELECT * FROM appointments WHERE id = ${req.params.id}`,
        (err, result) => {
        if (err) {
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving booking.",
            });
        } else {
            res.send(result);
        }
        }
    );
};

export const createBooking = (req, res) => {
    const { user_id, description, appointment_date } = req.body;

    // Use prepared statements to prevent SQL injection
    const query = `INSERT INTO appointments (user_id, description, appointment_date) VALUES (?, ?, ?)`;
    
    dbConn.query(query, [user_id, description, appointment_date], (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the booking.",
            });
        } else {
            res.send(result);
        }
    });
};


export const updateBooking = (req, res) => {
    const { user_id, description, appointment_date } = req.body;

    // Use prepared statements to prevent SQL injection
    const query = `UPDATE appointments SET user_id = ?, description = ?, appointment_date = ? WHERE appointment_id = ?`;

    dbConn.query(query, [user_id, description, appointment_date, req.params.id], (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the booking.",
            });
        } else {
            res.send(result);
        }
    });
};


export const deleteBooking = (req, res) => {
    dbConn.query(
        `DELETE FROM appointments WHERE id = ${req.params.id}`,
        (err, result) => {
        if (err) {
            res.status(500).send({
            message: err.message || "Some error occurred while deleting the booking.",
            });
        } else {
            res.send(result);
        }
        }
    );
}

export const deleteAllBookings = (req, res) => {
    dbConn.query(`DELETE FROM appointments`, (err, result) => {
        if (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting all bookings.",
        });
        } else {
        res.send(result);
        }
    });
};

export const getBookingsByDate = (req, res) => {
    dbConn.query(
        `SELECT * FROM appointments WHERE date = '${req.params.date}'`,
        (err, result) => {
        if (err) {
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving bookings.",
            });
        } else {
            res.send(result);
        }
        }
    );
}

