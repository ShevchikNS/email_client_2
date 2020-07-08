const passport = require('passport');
const router = require('express').Router();

const auth = require('../controllers/auth.js');

router.get('/signup', auth.signup);
router.get('/signin', auth.signin);
router.post(
  '/signup',
  passport.authenticate('local-signup', { // TODO  passport.authenticate move to controllers
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
  }),
);

router.get('/logout', auth.logout);
router.post(
  '/signin',
  passport.authenticate('local-signin', { // TODO  passport.authenticate move to controllers
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
  }),
);

module.exports = router;
