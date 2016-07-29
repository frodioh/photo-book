//Шаблон для модулей маршрутизации
var express = require('express');
var router = express.Router();
//Подключение к базе
var mongoose = require('../connection');
//Модели
var User = require('../models').user;
var Albom = require('../models').albom;
var Photo = require('../models').photo;

router.get('/:id', function(req, res) {
  var id = req.params.id;
  var pattern = new RegExp('^('+id+')', 'i');
  var session = req.session;
  User.findOne({_id: session.id}, function(err, doc) {
    if (doc) {
      Album.findOne({_id: pattern}, function(err, album) {
        if(album) {
          var information = {
            albomInfo: album
          };
          User.findOne({_id: album.userId}, function(err, user) {
            if(user) {
              information.userInfo = user;
              Photo.find({albomId: album._id}, function(err, photos) {
                if(photos) {
                  information.photos = photos;
                  if(user._id.str === session.id) {
                    res.render('albumMy', information);
                  } else {
                    res.render('album', information);
                  }
                } else {
                  if(user._id.str == session.id) {
                    res.render('albumMy', information);
                  } else {
                    res.render('album', information);
                  }
                  console.log(err);
                }
              });
            } else {
              res.redirect('../user');
              console.log(err);
            }
          });
        } else {
          res.redirect('../user');
          console.log(err);
        }
      });
    } else {
      res.redirect('../login');
      console.log(err);
    }
  });
});

module.exports = router;