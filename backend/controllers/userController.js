const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrorHandler = require('../middlerware/catchAsyncError');

// adding a user
addUser = AsyncErrorHandler(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: 'Some id',
            url: 'Some url'
        }
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token
    })
})

// login user
loginUser = AsyncErrorHandler(async (req, res, next) => {
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

    const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        token
    })
})

module.exports = {
    addUser,
    loginUser
}