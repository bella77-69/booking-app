// netlify/functions/adminLogin.js
const { db } = require('../../server/config/db.config')
const { adminLoginController } = require('../../server/controllers/admin.controller'); 
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