const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        },
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required'],
        validate: {
            validator: function (value) {
                // Ensure confirmPassword matches the password field
                return value === this.password;
            },
            message: 'Passwords must match',
        },
    }
});

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Email is required.'], 
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
            'Please enter a valid email address'
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        },
    },
});

loginSchema.pre('save', function (next) {
    this.confirmPassword = undefined;
    next();
});

const RegisterUser = mongoose.model('RegisterUser', registerSchema);
const LoginUser = mongoose.model('LoginUser', loginSchema);

module.exports = {RegisterUser, LoginUser};