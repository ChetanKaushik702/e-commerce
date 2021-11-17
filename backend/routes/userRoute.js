const express = require('express');
const { addUser, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(addUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

module.exports = router;