#!user/bin/env node
'use strict';

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    connectFlash = require('connect-flash'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport'),
    port = 3000;

mongoose.connect('mongodb://localhost/chat');
let db = mongoose.connection;

// Следим за подключением
db.on('open', () => {
    console.log('Connect to MongoDb success');
});

// Следим за ошибками БД
db.on('error', () => {
    console.log('Connect to MongoDb error');
});

app.set('views', path.join(__dirname, '../client')); // путь до основного indexhtml() файла
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client'))); // подключает внешние файлы без ошибок

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use((req, res, next) => {
   res.locals.message = require('express-messages')(req, res);
   next();
});

app.use(expressValidator({
    errorFormatter: (peram, MSGesture,  value) => {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: MSGesture, 
            value: value
        }
    }
}));

const Article = require('./models/articles');

app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log('err');
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            })
        }
    })
});

app.get('/articles/add', (req, res) => {
    res.render('../client/html/article/article', {
        title: 'add Articles',
    })
});

app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    
    article.save((err) => {
        if (err) {
            console.log('err');
            return;
        } else {
            res.redirect('/');
        }
    })
});

/*const articles = require('./routes/articles'),
    users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);*/

// Устанавливаем порт серверу
app.listen(port, () => {
    console.log('Сервер запущен   localhost:', port);
});