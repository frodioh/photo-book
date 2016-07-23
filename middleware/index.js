//Экспортируется функция, которая будет запущена в index.js
//Здесь находятся все middleware
module.exports = function (app, express) {
    //Подключение модулей
    var jade = require('jade');
    var path = require('path');
    var bodyParser = require('body-parser')
    //Хранение сессий
    var MongoStore = require('connect-mongo')(express);
    //Подключение мангуста
    var mongoose = require('../mongoose');
    //Конфиг
    var config = require('../config.json');

    //Установка движка рендеринга
    app.set('view engine', 'jade');
    app.set('views', path.resolve(`../template`));
    //Преобразование тела запроса в json
    app.use(bodyParser.json());
    //Использование сессий
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'coffee',
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    }));
    //Директория статических ресурсов
    app.use(express.static('../public'));
    app.use('/public', express.static('../public'));
};