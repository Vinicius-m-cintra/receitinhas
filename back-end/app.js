var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors')

var app = express();


const database = require('./config/database');
database('mongodb://localhost:27017/receitas');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const comentario = require('./routes/comentario');
app.use('/comentario', comentario);

const ingrediente = require('./routes/ingrediente');
app.use('/ingrediente', ingrediente);

const login = require('./routes/login');
app.use('/login', login);

const user = require('./routes/user');
app.use('/user', user);

const receita = require('./routes/receita');
app.use('/receita', receita);

module.exports = app;
