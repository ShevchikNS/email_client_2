const service = require('../services/profiledb');
const logger = require('../utils/logger');

module.exports = {
  showProfileAddPage: (req, res) => {
    res.render('profile');
  },

  addProfile: async (req, res) => { // TODO add profile with username, rename method "addProfile"
    const {
      firstName,
      lastName,
    } = req.body;

    const userId = req.user.id;

    const data = {
      firstName,
      lastName,
      userId,
    };

    try {
      const profile = await service.create(data);

      res.send(profile);
    } catch (error) {
      logger.error(error, ['controllers', 'profile', 'addProfile', `userId ${userId}`]);
    }
  },
};
