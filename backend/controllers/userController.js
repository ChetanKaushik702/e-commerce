const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrorHandler = require('../middlerware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// adding a user
const addUser = AsyncErrorHandler(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: 'Some id',
            url: 'Some url'
        }
    });

    sendToken(user, 201, res);
})

// login user
const loginUser = AsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 401));
    }

    const user = await User.findOne({email}).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);
})

// logout user
const logoutUser = AsyncErrorHandler(async (req, res, next) => {
    res.cookie('token', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
})

// forgot password
const forgotPassword = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // get password rest token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is: \n\n${resetPasswordUrl}.\n\nIf you have not requested this email, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.expirePasswordToken = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, 500));
    }
});

// reset password
const resetPassword = AsyncErrorHandler(async (req, res, next) => {
    // Hashing and adding resetPasswordToken to userSchema
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        expirePasswordToken: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Invalid/expired reset password token', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password didn\'t match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.expirePasswordToken = undefined;

    await user.save();

    sendToken(user, 200, res);
})

// get user details
const getUserDetails = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
})

// update password 
const updatePassword = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password didn\'t match', 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
})

// update profile
const updateProfile = AsyncErrorHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        findAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
})

// get All Users : ADMIN
const getAllUsers = AsyncErrorHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
})

// get A Single User : ADMIN
const getASingleUser = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn\'t exist with id: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        user
    });
})

// update user role: ADMIN
const updateUserRole = AsyncErrorHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn\'t exist with id: ${req.params.id}`, 400));
    }
    user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        findAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
})

// delete user: ADMIN
const deleteUser = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn\'t exist with id: ${req.params.id}`, 400));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
})

module.exports = {
    addUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getASingleUser,
    updateUserRole,
    deleteUser
}