//Шаблон для модулей маршрутизации
var express = require('express');
var router = express.Router();
//Подключение к базе
var mongoose = require('../connection');
var ObjectId = require('mongoose').Types.ObjectId;
//Хранение сессий
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//Модели
var User = require('../models').user;
var Albom = require('../models').albom;
var Photo = require('../models').photo;

//Страница пользователя
router.get('/', function(req, res) {
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

router.get('/:id', function(req, res) {
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

module.exports = router;