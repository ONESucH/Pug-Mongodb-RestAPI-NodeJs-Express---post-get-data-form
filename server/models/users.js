'use strict';

const mongoose = require('mongoose'),
    UserShema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        nik: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }),
    User = module.exports = mongoose.model('User', UserShema);