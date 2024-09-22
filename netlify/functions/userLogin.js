const {userController } = require('../../server/controllers/user.controller');

exports.handler = async (event, context) => {
    try {
        const user = await userController();
        return {
            statusCode: 200,
            body: JSON.stringify(user),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
