//Подключение модулей
var jade = require('jade');
var express = require('express');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
//Конфиг
var config = require('./config.json');
//Создание сервера
var app = express();
//Подключение к базе
var mongoose = require('./connection');
var ObjectId = require('mongoose').Types.ObjectId;
//Хранение сессий
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//Модели
var User = require('./models').user;
var Albom = require('./models').albom;
var Photo = require('./models').photo;
//======================================================

//Middleware
var middleware = require('./middleware')(app, express);


app.get('/', function(req, res) {
  //Редирект на страницу пользователя
  //Или на страницу входа, если нет идентификатора в сессии
  if(req.session.user) {
    res.redirect('/user');
  } else {
    res.redirect('/login');
  }
});

//Страница входа
app.get('/login', function(req, res) {
  res.render('login');
});

//Авторизация
app.post('/auth', function(req, res) {
  var data = req.body;
  //Запрос к базе
  User.findOne({email: data.email}, function(err, doc){
    if(doc) {
      var password = crypto.createHash('md5').update(data.password).digest('hex');
      if(password === doc.password) {
        req.session.userId = doc._id;
        console.log(req.session);
        res.json({isValid: true});
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
      console.log(err);
    }
  });
});

//Регистрация
app.post('/register', function(req, res) {
  var data = req.body;
  //Запрос к базе
  User.findOne({email: data.email}, function(err, doc){
    if(doc) {
      res.json({isValid: false});
    } else {
      var newUser = new User(data);
      newUser.save(function(err, doc) {
        if(err) {
          console.log(err);
          res.json({isValid: false});
        }
        else {
          var userDir = path.resolve('./media/' + doc._id);
          console.log(userDir);
          if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
          }
          res.redirect('/login');
        }
      });
    }
  });
});

//Страница пользователя
app.use('/user', require('./routes/user'));

//Страница альбома
app.use('/album', require('./routes/album'));

//Поиск
app.use('/search', require('./routes/search'));

app.listen(config.http.port, config.http.host, function() {
  console.log('Server is up');
});