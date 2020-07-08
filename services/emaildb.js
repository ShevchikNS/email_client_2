const models = require('../models');

module.exports = {
  addEmail: async (userId, emailData) => {
    const user = await models.User.findByPk(userId);
    const email = await models.Email.create(emailData);
    user.addEmail(email);
    return email;
  },

  getEmail: async (userId, email) => {
    const emailAccount = await models.Email.findOne({ // TODO rename userEmails
      where: {
        email,
      },
      include: {
        model: models.User,
        attributes: [],
        as: 'user',
        where: {
          id: userId,
        },
      },
    });

    return emailAccount;
  },
};
