var express = require('express');
var router = express.Router();
var crypto = require('crypto');

// Routes
// =====================================

module.exports = function (models) {

	router

		// Display the user list in HMTL
		.get('/', function (req, res) {
			res.end(JSON.stringify(models.User.findAll()));
		})

		// Create a new user
		.post('/', function (req, res) {

			if (! req.body['email']) {
				res.end('Email not found.');
			}

			if (req.body['password'] !== req.body['confirmed_password']) {
				res.end('Password does not match.');
			}

			res.end('TODO');
		})

		// Display a single user as HTML
		.get('/:id', function (req, res) {
			res.end('TODO');
		});

	return router;

};
