const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        minlength: [4, 'Name must have more than 4 characters'],
        maxlength: [30, 'Name must not have more than 30 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email'],
        validate: [validator.isEmail, 'Please enter a valid email-id']
    },
    password: {
        type: String,
        select: false,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password must not have less than 8 characters']
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },

    resetPasswordToken: String,
    expirePasswordToken: Date
})

module.exports = mongoose.model(userSchema);