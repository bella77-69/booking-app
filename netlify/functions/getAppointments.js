// netlify/functions/getAppointments.js
const { getAppointmentsController } = require('../../server/controllers/appointment.controller');

exports.handler = async (event, context) => {
    try {
        const appointments = await getAppointmentsController();
        return {
            statusCode: 200,
            body: JSON.stringify(appointments),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
