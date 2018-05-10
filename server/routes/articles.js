'use strict';

const express = require('express'),
    router = express.router(),
    Article = require('../models/articles');

router.get('/:id', (req, res) => {
    Article.findById(req.param.id, (err, article) => {
        res.render('article', {
            article: article
        })
    })
});

router.get('/articles/add', (req, res) => {
    res.render('index', {
        title: 'index'
    });
});

router.get('/article/:id', (req, res) => {
    Article.findById(req.param.id, (err, article) => {
        res.render('article', {
            article: article
        })
    })
});

router.post('/articles/add', (req, res) => {
   req.checkBody('title', 'Tytle in required').notEmpty();
   req.checkBody('author', 'Author in required').notEmpty();
   req.checkBody('body', 'Body in required').notEmpty();
   
   if (req.validationError()) {
       res.render('index', {
           title: 'Add article',
           error: errors
       })
   } else {
       let article = new Article;
       article.title = req.body.title;
       article.author = req.body.author;
       article.body = req.body.body;
       
       article.save((err) => {
           if (err) throw err;
           
           req.flash('success', 'Article added');
           res.redirect('/');
       })
   }
});

router.delete('/article/:id', (req, res) => {
   Article.remove(query, (err) => {
       if (err) throw err;
       
       res.send('Success');
   });
});

module.exports = router;