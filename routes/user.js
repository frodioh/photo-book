//Шаблон для модулей маршрутизации
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if(req.session.passport.user === undefined) {
    res.redirect('/login');
  } else {
    res.redirect('/idOfUser');
  }
});

module.exports = router;