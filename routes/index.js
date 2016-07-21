var file1 = require(./file1);
var file2 = require(./file2);
var file3 = require(./file3);

module.exports = function (app) {
    app.get('/', file1);

    app.post('/register', register.requestRegistration);

    app.get('/users', authentication.users);
    app.get('/users/:id', authentication.user);

    app.get('*', error['404']);
};