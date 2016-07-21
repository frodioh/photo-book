//Экспортируется функция, которая будет запущена в index.js
//Здесь находятся все middleware
module.exports = function (app, express) {
    //Подключение модулей
    var jade = require('jade');
    var path = require('path');
    var config = require('../config.json');
    var MongoStore = require('connect-mongo')(express);
    var router = require('../routes');
    /**
     * Установка движка рендеринга
     * */
    app.set('view engine', 'jade');
    app.set('views', path.resolve(`../template`));
    /**
     * Favicon
     * */
    app.use(express.favicon('public/images/favicon.ico'));
    /**
     * Session
     * */
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.get('session:secret'),
        key: config.get('session:key'),
        cookie: config.get('session:cookie'),
        store: new MongoStore({mongoose_connection: mongoose.connection})
    }));
    /**
     * Routing
     * */
    app.use(app.router);
    router(app);
    /**
     * Public directory
     * */
    app.use(express.static(path.join(__dirname, '../public')));
    app.use("/public", express.static(path.join(__dirname, '../public')));
};