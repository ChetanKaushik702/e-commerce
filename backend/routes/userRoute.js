const express = require('express');
const { addUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(addUser);
router.route('/login').post(loginUser);

module.exports = router;