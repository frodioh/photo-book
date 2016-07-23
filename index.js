//Подключение модулей
var jade = require('jade');
var express = require('express');
var crypto = require('crypto');
//Конфиг
var config = require('./config.json');
//Создание сервера
var app = express();
//Подключение к базе
var mongoose = require('./mongoose');
//Хранение сессий
var MongoStore = require('connect-mongo')(express);
//Модели
var User = require('./models').user;
var Albom = require('./models').albom;
var Photo = require('./models').photo;
//Модули маршрутизации
var user = require('./routes/user');
var album = require('./routes/album');
var search = require('./routes/search');

//======================================================
//Middleware
var middleware = require('./middleware')(app, express);

app.get('/', function(req, res) {
  //Редирект на страницу пользователя
  //Или на страницу входа, если нет идентификатора в сессии
  if(req.session.id) {
    res.redirect('/user');
  } else {
    res.redirect('/login');
  }
});

//Авторизация
app.get('/login', function(req, res) {
  var data = req.body;
  //Запрос к базе
  User.findOne({email: data.email}, function(err, doc){
    if(doc) {
      var password = crypto.createHash('md5').update(data.pass).digest('hex');
      if(password === doc.password) {
        req.session.id = doc._id.str;
        res.redirect('/user');
      } else {
        res.render('login');
      }
    } else {
      res.render('login');
      console.log(err);
    }
  });
});

//Страница пользователя
app.get('/user', user);

//Страница альбома
app.get('/album', album);

//Поиск
app.get('/search', search);