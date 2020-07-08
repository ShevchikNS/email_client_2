const models = require('../models');

module.exports = {
    addEmail: async (userId, messageData) => {
        const user = await models.User.findByPk(userId);
        const message = await models.Message.create(MessageData);
        user.addEmail(message);
        return message;
    },

    getEmail: async (userId, message) => {
        const sendmessage = await models.Message.findOne({ // TODO rename userEmails
            where: {
                message,
            },
            include: {
                model: models.Message,
                attributes: [],
                as: 'user',
                where: {
                    id: userId,
                },
            },
        });

        return sendmessage;
    },
};