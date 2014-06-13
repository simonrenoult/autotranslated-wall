var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var User = require ( '../models/user' );

// API ROUTES
// =====================================

router

	// Show the user list as JSON
	.get('/users', function (req, res) {
		User.find({}, function (err,  users) {
			res.end(JSON.stringify(users));
		});
	})

	// Delete all the users
	.delete('/users', function (req, res) {
		User.find({}, function (err, users) {
			users.forEach(function (user) {
				user.remove();
			});
		});

		res.end();
	})

	// Show a single user as JSON
	.get('/users/:id', function (req, res) {
		User.findById(req.params.id, function (err, user) {
			res.end(JSON.stringify(user));
		});
	});

module.exports = router;