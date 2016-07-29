//Подключение модулей
var jade = require('jade');
var express = require('express');
var crypto = require('crypto');
var path = require('path');
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
//Директория статических ресурсов
app.use(express.static('public'));
//Установка движка рендеринга
app.set('view engine', 'jade');
app.set('views', path.resolve('./template'));
//Преобразование тела запроса в json
app.use(bodyParser.json());
app.use(cookieParser());
//Использование сессий
app.use(session({
  secret: 'coffee',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

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
          res.redirect('/login');
        }
      });
    }
  });
});

//Страница пользователя
app.get('/user', function(req, res) {
  console.log(req.session);
  if(req.session.userId) {
    var query = {_id: new ObjectId(req.session.userId)};
    //Запрос к базе
    User.findOne(query, function(err, user) {
      if(user) {
        var information = {
          userInfo: user
        };
        Albom.find({userId: user._id}, function(err, alboms) {
          if(alboms) {
            information.alboms = alboms;
            Photo.find({}).sort({date: 'descending'}).limit(6).exec(function(err, photos) {
              if(photos) {
                information.photos = photos;
                res.render('user', information);
                console.log(information);
              } else {
                console.log(err);
                console.log(information);
                res.render('user', information);
              }
            });
          } else {
            console.log(err);
            console.log(information);
            res.render('user', information);
          }
        });
      } else {
        console.log(err);
        res.redirect('../login');
      }
    });
  } else {
    res.redirect('../login');
  }
});

app.get('user/:id', function(req, res) {
  var id = req.params.id;
  var session = req.session;
  console.log(id);
  if(id.length===24) {
    var query = {_id: new ObjectId(id)};
    User.findOne(query, function(err, user) {
      if(user) {
        var information = {
          userInfo: user
        };
        Albom.find({userId: user._id}, function(err, alboms) {
          if(alboms) {
            information.alboms = alboms;
            Photo.find({userId: user._id}, function(err, photos) {
              if(photos) {
                information.photos = photos;
                res.render('anotherUser', information);
              } else {
                res.render('anotherUser', information);
                console.log(err);
              }
            });
          } else {
            res.render('anotherUser', information);
            console.log(err);
          }
        });
      } else {
        res.redirect('/');
        console.log(err);
      }
    });
  } else {
    res.redirect('/');
  }
});

//Страница альбома
app.use('/album', require('./routes/album'));

//Поиск
app.use('/search', require('./routes/search'));

app.listen(config.http.port, config.http.host, function() {
  console.log('Server is up');
});