'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    email: String,
    address: String,
    password: String
}));
