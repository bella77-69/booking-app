// netlify/functions/adminLogin.js
const { db } = require('../config'); // Adjust path as needed
const { adminLoginController } = require('../controllers/admin.controller'); // Adjust path as needed

exports.handler = async (event, context) => {
    try {
        const admin = await adminLoginController(db, event);
        return {
            statusCode: 200,
            body: JSON.stringify(admin),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
// netlify/functions/getServices.js