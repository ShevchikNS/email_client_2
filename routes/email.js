const express = require('express');

const emailController = require('../controllers/email');

const authMiddlewares = require('../middlewares/auth');

const router = express.Router();

// router.get('/', authMiddlewares.isLoggedIn, emailController.showEmailAddPage);
// router.post('/', authMiddlewares.isLoggedIn, emailController.addEmail);

router.get('/new', emailController.newEmailForm); // TODO rename routes
router.post('/send', authMiddlewares.isLoggedIn, emailController.sendEmail); // TODO rename routes
// router.get('/a', authMiddlewares.isLoggedIn, emailController.getEmail); // TODO rename routes
// router.get('/b', authMiddlewares.isLoggedIn, emailController.getMessagesInRange);


module.exports = router;
