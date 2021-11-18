const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    } else {
        next();
    }
})

// generate JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

// checking password matching
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

// generating reset password token
userSchema.methods.getResetPasswordToken = function () {
    // Generating token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.expirePasswordToken = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('user', userSchema);