const express = require('express');
const { addUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getASingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, isAuthorizedRole } = require('../middlerware/auth');
const router = express.Router();

router.route('/register').post(addUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/me/profile').put(isAuthenticatedUser, updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, isAuthorizedRole('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, isAuthorizedRole('admin'), getASingleUser).put(isAuthenticatedUser, isAuthorizedRole('admin'), updateUserRole).delete(isAuthenticatedUser, isAuthorizedRole('admin'), deleteUser);

module.exports = router;