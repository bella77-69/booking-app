const {serviceController} = require('../../server/controllers/service.controller');

exports.handler = async (event, context) => {
    try {
        const services = await serviceController();
        return {
            statusCode: 200,
            body: JSON.stringify(services),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};