
const imap = require('../services/imap');

module.exports = {
  signup: (req, res) => {
    res.render('signup');
  },
  signin: (req, res) => {
    res.render('signin');
  },
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  },
  dashboard: async (req, res) => { // TODO move to routes/app
    await imap.init(req.user);
    const box = await imap.openInbox();
    
    const messages = await imap.fetchMessages(1, 20);

    res.render('dashboard', { messages });
  },
};
