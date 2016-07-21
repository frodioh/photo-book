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
//Middleware
var middleware = require('./middleware')(app, express);