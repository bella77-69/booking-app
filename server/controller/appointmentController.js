import * as  dbConn from "../config/db.config.js";

export const getAllBookings = (req, res) => {
    dbConn.query("SELECT * FROM appointments", (err, result) => {
        if (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving booking.",
        });
        } else {
        res.send(result);
        }
    });
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
    const { name, email, phone, date, time, service, stylist } = req.body;
    dbConn.query(
        `INSERT INTO appointments (name, email, phone, date, time, service, stylist) VALUES ('${name}', '${email}', '${phone}', '${date}', '${time}', '${service}', '${stylist}')`,
        (err, result) => {
        if (err) {
            res.status(500).send({
            message: err.message || "Some error occurred while creating the booking.",
            });
        } else {
            res.send(result);
        }
        }
    );
}

export const updateBooking = (req, res) => {
    const { name, email, phone, date, time, service, stylist } = req.body;
    dbConn.query(
        `UPDATE appointments SET name = '${name}', email = '${email}', phone = '${phone}', date = '${date}', time = '${time}', service = '${service}', stylist = '${stylist}' WHERE id = ${req.params.id}`,
        (err, result) => {
        if (err) {
            res.status(500).send({
            message: err.message || "Some error occurred while updating the booking.",
            });
        } else {
            res.send(result);
        }
        }
    );
}

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

