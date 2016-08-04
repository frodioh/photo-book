//Подключение модулей
var jade = require('jade');
var express = require('express');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var multiparty = require('multiparty');
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
          var userDir = path.resolve('./public/media/' + doc._id);
          console.log(userDir);
          if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
            fs.mkdirSync(path.resolve('./public/media/' + doc._id + "/avatar"));
            fs.mkdirSync(path.resolve('./public/media/' + doc._id + "/bg"));
            fs.mkdirSync(path.resolve('./public/media/' + doc._id + "/albums"));
          }
          res.redirect('/login');
        }
      });
    }
  });
});

//Обновление информации о пользователе
app.post('/profile', function(req, res) {
  var session = req.session;
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var user = {
      name: fields.userEditName,
      info: fields.userEditCaption,
      photoLink: '/media/' + session.userId + '/avatar/avatar' + path.parse(files.userEditAvatar[0].path).ext,
      bgLink: '/media/' + session.userId + '/bg/bg' + path.parse(files.userEditBg[0].path).ext,
      social: {
        vk: fields.userEditVk,
        fb: fields.userEditFb,
        twitter: fields.userEditTwitter,
        googlePlus: fields.userEditGoogle,
        email: fields.userEditEmail,
      }
    };
    var newFilePathAvatar = './public/media/' + session.userId + '/avatar/avatar' + path.parse(files.userEditAvatar[0].path).ext;
    var newFilePathBg = './public/media/' + session.userId + '/bg/bg' + path.parse(files.userEditBg[0].path).ext;
    try {
      fs.writeFileSync(path.resolve(newFilePathAvatar),fs.readFileSync(files.userEditAvatar[0].path));
      fs.writeFileSync(path.resolve(newFilePathBg),fs.readFileSync(files.userEditBg[0].path));
    } catch (err) {
      console.log("файл не загрузился");
      console.log(files.userEditBg[0].path);
      console.log(files.userEditAvatar[0].path);
      console.log(err);
      console.log(newFilePathBg);
      console.log(newFilePathAvatar);
    }
    User.findOne({_id: new ObjectId(req.session.userId)}, function (err, doc){
      doc.name = user.name;
      doc.info = user.info;
      console.log(files.userEditAvatar[0].path);
      console.log(files.userEditBg[0].path);
      console.log(files.userEditBg[0]);
      console.log(files.userEditAvatar[0]);
      if (files.userEditAvatar[0].originalFilename) {
        doc.photoLink = user.photoLink;
      }
      if (files.userEditBg[0].originalFilename) {
        doc.bgLink = user.bgLink;
      }
      doc.social.vk = user.social.vk;
      doc.social.fb = user.social.fb;
      doc.social.twitter = user.social.twitter;
      doc.social.googlePlus = user.social.googlePlus;
      doc.social.email = user.social.email;
      doc.save();
      var valid = {
            "isValid": true
          };
      valid = JSON.stringify(valid);
      res.setHeader('Content-Type', 'application/json; charset=utf8;');
      res.end(valid);
    });
  });
});

//Добавление альбома
app.post('/addAlbum', function(req, res) {
  var session = req.session;
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var photo = {
      _id: ObjectId()
    };
    var album = {
      _id: ObjectId(),
      userId: session.userId,
      title: fields.uploadName,
      description: fields.uploadDescription,
      date: new Date(),
      photos: [photo._id],
      thumb: photo._id
    };
    photo.albomId = album._id;
    photo.albomName = album.title;
    photo.userId = session.userId;
    photo.link = "/media/" + session.userId + "/albums/" + album._id + "/" + photo._id + path.parse(files.albumUploadThumb[0].path).ext;
    photo.date = new Date();
    //Создание директории альбома
    fs.mkdirSync(path.resolve("./public/media/" + session.userId + "/albums/" + album._id));
    var newFilePathPhoto = "./public/media/" + session.userId + "/albums/" + album._id + "/" + photo._id + path.parse(files.albumUploadThumb[0].path).ext;
    try {
      fs.writeFileSync(path.resolve(newFilePathPhoto),fs.readFileSync(files.albumUploadThumb[0].path));
    } catch (err) {
      console.log("файл не загрузился");
      console.log(err);
    }
    //Создание документов по моделям
    photo = new Photo(photo);
    album = new Albom(album);
    photo.save(function(err, doc) {
      if(doc) {
        album.save(function(err, doc) {
          if(doc) {
            var valid = {
              "isValid": true
            };
            valid = JSON.stringify(valid);
            res.setHeader('Content-Type', 'application/json; charset=utf8;');
            res.end(valid);
          } else {
            var valid = {
              "isValid": false
            };
            valid = JSON.stringify(valid);
            res.setHeader('Content-Type', 'application/json; charset=utf8;');
            res.end(valid);
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
    
  });
});

//Обновление информации на главной странице
app.post('/userUpdate', function(req, res) {
  var session = req.session;
  var query = {_id: new ObjectId(req.session.userId)};
  //Запрос к базе
  User.findOne(query, function(err, user) {
    var information = {
      userInfo: user
    };
    Albom.find({userId: user._id}, function(err, alboms) {
      if(alboms) {
        information.alboms = alboms;
        Photo.find({}).sort({date: 'descending'}).limit(6).exec(function(err, photos) {
          if(photos) {
            information.photos = photos;
            res.json(information);
            console.log(information);
          } else {
            console.log(err);
            console.log(information);
            res.json(information);
          }
        });
      } else {
        console.log(err);
        console.log(information);
        res.json(information);
      }
    });
  });
});

//Удаление сессии
app.post('/deleteSession', function(req, res) {
  req.session.userId = null;
  res.json({
    "isValid": true
  })
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