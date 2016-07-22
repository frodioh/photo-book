//Экспортируется функция, которая будет запущена в index.js
//Здесь находятся все middleware
module.exports = function (app, express) {
    //Подключение модулей
    var jade = require('jade');
    var path = require('path');
    var MongoStore = require('connect-mongo')(express);
    var config = require('../config.json');
    var passport = require('./auth');
    //Установка движка рендеринга
    app.set('view engine', 'jade');
    app.set('views', path.resolve(`../template`));
    //Директория статических ресурсов
    app.use(express.static(path.join(__dirname, '../public')));
    app.use("/public", express.static(path.join(__dirname, '../public')));
    //Запуск модуля пасспорт
    app.use(passport.initialize());
    app.use(passport.session);

    return {
        "passport": passport
    }
};