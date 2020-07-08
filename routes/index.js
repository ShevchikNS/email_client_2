const express = require('express');

const auth = require('./auth');
const email = require('./email');
const profile = require('./profile');
const app = require('./app');

const router = express.Router();

router.use('/', auth);
router.use('/dashboard', app);
router.use('/email', email);
router.use('/profile', profile);

module.exports = router;
