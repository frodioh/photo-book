//Шаблон для модулей маршрутизации
var express = require('express');
var router = express.Router();
//Подключение к базе
var mongoose = require('./mongoose');
//Модели
var User = require('./models').user;
var Albom = require('./models').albom;
var Photo = require('./models').photo;

router.get('/:query', function(req, res) {
  var session = req.session;
  var query = req.params.query;
  var pattern = new RegExp(query, 'i');
  var information = {};
  User.findOne({_id.str: session.id}, function(err, user) {
    if(user) {
      information.user = user;
      Photo.find($or: [{title: pattern}, {description: pattern}], function(err, photos) {
        if(photos) {
          information.photos = photos;
          information.albums = [];
          information.isFound = true;
          for(var i = 0; i<photos.length; i++) {
            var albumItem = {
              link: '/album/' + photos[i].albomId.str.substr(0, 10),
              albumName: photos[i].albumName
            }
            information.albums.push(albumItem);
            var ownerIds = [];
            var ownerIdItem = {
              _id: photos[i].userId
            }
            ownerIds.push(ownerIdItem);
          }
          User.find($or: ownerIds, function(err, owners) {
            if(owners) {
              information.owners = owners;
              res.render('search', information);
            }
          });
        } else {
          information.isFound = false;
          render('search', information);
          console.log(err);
        }
      });
    } else {
      res.redirect('../login');
    }
  });
});

module.exports = router;