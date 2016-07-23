//Шаблон для модулей маршрутизации
var express = require('express');
var router = express.Router();
//Подключение к базе
var mongoose = require('./mongoose');
//Модели
var User = require('./models').user;
var Albom = require('./models').albom;
var Photo = require('./models').photo;

router.get('/', function(req, res) {
  var session = req.session;
  //Запрос к базе
  User.findOne({_id.str: session.id}, function(err, user) {
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
            } else {
              res.render('user', information);
              console.log(err);
            }
          });
        } else {
          res.render('user', information);
          console.log(err);
        }
      });
    } else {
      console.log(err);
      res.redirect('../login');
    }
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  var pattern = new RegExp('^('+id+')', 'i');
  var session = req.session;
  User.findOne({_id.str: pattern}, function(err, user) {
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

});

module.exports = router;