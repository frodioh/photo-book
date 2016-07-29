//Экспортируется функция, которая будет запущена в index.js
//Здесь находятся все middleware
module.exports = function (app, express) {
    //Подключение модулей
    var jade = require('jade');
    var path = require('path');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    //Хранение сессия
    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);
    //Подключение мангуста
    var mongoose = require('../connection');
    //Конфиг
    var config = require('../config.json');

    //Установка движка рендеринга
    app.set('view engine', 'jade');
    app.set('views', path.resolve('./template'));
    //Преобразование тела запроса в json
    app.use(bodyParser.json());
    app.use(cookieParser());
    //Использование сессий
    app.use(session({
      secret: 'coffee',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    }));
};