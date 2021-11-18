const express = require('express');
const { addUser, loginUser, logoutUser, forgotPassword, resetPassword } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(addUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logoutUser);

module.exports = router;