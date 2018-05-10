'use strict';

const mongoose = require('mongoose'),
    ArticleShema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model('Article', ArticleShema);