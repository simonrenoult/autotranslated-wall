var express = require('express');
var router = express.Router();
var crypto = require('crypto');

// Routes
// =====================================

module.exports = function(models) {

	router

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
			res.end('TODO');
		});

	return router;
};
