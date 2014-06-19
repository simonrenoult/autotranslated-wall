var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var models = require('../models');
var http = require('http');
var sequelize = require('Sequelize');

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

	.get('/translations/:id', function(req, res) {

		models.Message.find(req.params.id).success(function(message) {

			models.Language.find(req.cookies.language_id).success(function(language){

				var post = http.request({
					host: 'localhost',
					port: '3001',
					path: '/',
					method: 'POST',
					headers: {
						'Content-Type' : 'application/json'
					}
				},
				function(postRes) {
					
					var data = "";

					postRes.on('data', function(chunk) {
						data += chunk;
					});

					postRes.on('end', function() {
						res.end(data);
					})

					postRes.on('error', function(data) {
						console.error(data);
					});
				});

				post.write(JSON.stringify({
					content: message.content,
					language_to: language.short_name
				}));
				post.end();

			});

		});
		
	})

	.get('/messages', function(req, res) {

		models.Message.findAll().success(function(messages) {

			models.User.findAll().success(function(users) {

				var userList = [];
				users.forEach(function(user) {
					userList["user#" + user.id] = user.alias;
				});

				var temp = JSON.stringify(messages);
				temp = JSON.parse(temp);
				
				temp.forEach(function(message) {
					message.alias = userList['user#'+message.UserId]
				});

				console.log(temp);

				res.end(JSON.stringify(temp));

			});

		});
		
	})

	.post('/messages', function(req, res) {
		console.log(req.body);
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