//Подключение модулей
var jade = require('jade');
var express = require('express');
//Конфиг
var config = require('./config.json');
//Создание сервера
var app = express();
//Подключение к базе
var mongoose = require('./mongoose');
//Модели
var User = require('./model').user;
var Albom = require('./model').albom;
var Photo = require('./model').photo;
//Модули маршрутизации
var birds = require('./routes/birds');
var login = require('./routes/login');
var user = require('./routes/user');

//======================================================
//Middleware
var middleware = require('./middleware')(app, express);
var passport = middleware.passport;

//Инициализация birds
app.use('/birds', birds);
//Страница пользователя
app.get('/user', user);

//Авторизация
app.get('/login', login);
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/user'
}));