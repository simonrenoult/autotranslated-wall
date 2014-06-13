var mongoose = require('mongoose');

var User = module.exports = mongoose.model ( 'User', {
	id: mongoose.Schema.ObjectId,
	email: String,
	password: String,
	preferred_language: String
} );