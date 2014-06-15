var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var models = require('../models')

// Routes
// =====================================

router

	// USERS
	// ===========================================

	// Show the user list as JSON
	.get('/users', function (req, res) {
		models.User.findAll().success(function(users) {
			res.end(JSON.stringify(users));
		});
	})

	// Add a new user
	.post('/users', function(req, res) {
		res.end('TODO');
	})

	// Delete all the users
	.delete('/users', function (req, res) {
		models.User.findAll().success(function(users) {
			users.forEach(function(user) {
				user.destroy();
			});
		});

		res.end();
	})

	// Show a single user as JSON
	.get('/users/:id', function (req, res) {
		models.User.find(req.params.id).success(function(user) {
			res.end(JSON.stringify(user));
		});
	})

	// LANGUAGES
	// ==========================================

	// Show the language list as JSON
	.get('/languages', function(req, res) {
		models.Language.findAll().success(function(languages) {
			res.end(JSON.stringify(languages));
		});
	})

	// Add a new language
	.post('/languages', function(req, res) {
		models.Language.create(req.body).success(function(language){
			res.status(201).end(JSON.stringify(language));
		})
	})

	.delete('/languages', function (req, res) {
		models.Language.findAll().success(function(languages) {				languages.forEach(function(language) {
				language.destroy();
			});
		});

		res.end();
	})

	// MESSAGES
	// ===========================================

	.get('/messages', function(req, res) {
		models.Message.findAll().success(function(messages) {
			res.end(JSON.stringify(messages));
		});
	})

	.post('/messages', function(req, res) {
		models.Message.create(req.body).success(function(message) {
			res.status(201).end(JSON.stringify(message));
		});
	})

	.delete('/messages', function (req, res) {
		models.Message.findAll().success(function(messages) {
			messages.forEach(function(message) {
				message.destroy();
			});
		});

		res.end();
	})

module.exports = router;