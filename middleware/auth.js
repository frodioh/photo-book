var express = require('express');
var mongoose = require('../mongoose');
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
//Модели
var User = require('../models').user;
var Albom = require('../models').albom;
var Photo = require('../models').photo;

//ЭТО ЗАГЛУШКА!
passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {
        if (username == "admin" && password == "admin") {
            return done(null, {
                username: "admin"
            });
        }
        return done(null, false, { 
            message: 'Неверный логин или пароль' 
        });
    }
));

//Функции для сериализации/десериализации данных юзеров
passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});
passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = passport;