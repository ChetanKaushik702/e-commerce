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

    res.status(201).json({
        success: true,
        user
    })
})

module.exports = {
    addUser
}