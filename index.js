//Подключение модулей
var jade = require('jade');
var express = require('express');
var config = require('./config.json');

//Подключение к базе
var mongoose = require('./mongoose');

//Модели
var User = require('./model').user;
var Albom = require('./model').albom;
var Photo = require('./model').photo;

//Сервер
var app = express();

//Установка движка рендеринга
app.set('view engine', 'jade');
app.set('views', path.resolve(`./template`));

//Middleware
app.use(express.static('./public'));