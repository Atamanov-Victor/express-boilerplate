const express = require('express');

const router = express.Router();
const { authController } = require('../controllers');
const needAuthorizedMiddleware = require('../middlewares/needAuthorized');

router.post('/sign-in', authController.login);
router.post('/sign-up', authController.signUp);
// router.post('/update-private-key', needAuthorizedMiddleware,  authController.updatePrivateKey);
router.get('/profile', needAuthorizedMiddleware, authController.profile);

module.exports = router;
