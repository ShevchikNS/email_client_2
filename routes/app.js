const express = require('express');

const authMiddlewares = require('../middlewares/auth');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.get('/', authMiddlewares.isLoggedIn, authController.dashboard);

module.exports = router;
