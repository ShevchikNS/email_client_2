const service = require('../services/emaildb');

const { sendMail } = require('../services/sendmail');
const logger = require('../utils/logger');

module.exports = {
  newEmailForm: (req, res) => {
    res.render('email');
  },

  sendEmail: async (req, res) => {
    console.log(req.body)
    try {
      await sendMail(req.user, req.body);

      res.redirect('/dashboard');
    } catch (error) {
      logger.error(error, ['controller', 'email', 'addEmail', `userId ${userId}`]); // TODO send errors to client
    }
  },
  getEmail: async (req, res) => { // TODO fix
    const userId = req.user.id; // TODO send emait in body
    const emailAccout = await service.getEmail(req.user.id, 'shevchikkola@gmail.com');

    try {
      imap.init(emailAccout);
      res.send();
    } catch (error) {
      logger.error(error, ['controller', 'email', 'addEmail', `userId ${userId}`]);
    }
  },
  getMessagesInRange: async (req, res) => { // todo By
    const userId = req.user.id;
    const emailAccout = await service.getEmail(req.user.id, 'shevchikkola@gmail.com');

    try {
      await imap.fetchMessages(2, 40);
      res.send();
    } catch (error) {
      logger.error(error, ['controller', 'email', 'addEmail', `userId ${userId}`]);
    }
  },
};
