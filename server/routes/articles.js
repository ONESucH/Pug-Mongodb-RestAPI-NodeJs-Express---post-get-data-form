'use strict';

const express = require('express'),
    router = express.Router(),
    Article = require('../models/articles');

router.get('/articles', (req, res) => {
    res.render('articles');
});