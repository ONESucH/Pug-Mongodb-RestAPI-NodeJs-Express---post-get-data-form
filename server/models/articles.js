'use strict';

const mongoose = require('mongoose'),
    ArticlesShema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    }),
    Article = module.exports = mongoose.model('Articles', ArticlesShema);