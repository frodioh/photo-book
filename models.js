var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

//Схемы
//Пользователи
var UsersSchema = new Schema({
  name: String,
  email: String,
  info: {
    type: String,
    default: ""
  },
  photoLink: {
    type: String,
    default: "/img/default_avatar.jpg"
  },
  bgLink: {
    type: String,
    default: "/img/default_bg.jpg"
  },
  social: {
    vk: {
      type: String,
      default: ""
    },
    fb: {
      type: String,
      default: ""
    },
    twitter: {
      type: String,
      default: ""
    },
    googlePlus: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    }
  },
  password: {
    type: String,
    set(v) {
      return crypto.createHash('md5').update(v).digest('hex');
    }
  }
});
//Альбомы
var AlbomsSchema = new Schema({
  userId: ObjectId,
  title: String,
  description: String,
  photos: [ObjectId],
  thumb: ObjectId,
  date: Date
});
//Фотографии
var PhotosSchema = new Schema({
  albomId: ObjectId,
  albomName: String,
  userId: ObjectId,
  title: {
    type: String,
    default: "Без названия"
  },
  description: {
    type: String,
    default: ""
  },
//  likes: [ObjectId],
//  comments: [
//    {
//      userId: ObjectId,
//      text: String
//    }
//  ],
  link: String,
  date: Date
});

//Модели
exports.user = mongoose.model('user', UsersSchema);
exports.albom = mongoose.model('albom', AlbomsSchema);
exports.photo = mongoose.model('photo', PhotosSchema);