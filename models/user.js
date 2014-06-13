var mongoose = require('mongoose');

var User = module.exports = mongoose.model ( 'User', {
	id: Number,
	email: String,
	password: String,
	preferred_language: String
} );