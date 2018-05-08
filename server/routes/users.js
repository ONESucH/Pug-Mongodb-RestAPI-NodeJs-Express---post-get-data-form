'use strict';

const express = require('express'), 
    router = express.Router(),
    User = require('../models/users');

router.get('/register', (req, res) => {
   res.render('register'); 
});