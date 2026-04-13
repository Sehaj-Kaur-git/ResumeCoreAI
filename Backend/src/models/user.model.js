const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'username already taken'],
    },

    email: {
        type: String,
        required: true,
        uniquie: [true, 'Account with this email already exists'],

    },
    password: {
        type: String,
        required: true,
    }
    })

    const usermodel = mongoose.model('User', userSchema)

    module.exports = usermodel