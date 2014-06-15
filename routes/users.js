var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var models = require('../models');

// Routes
// =====================================

router

	// Display the user list in HMTL
	.get('/', function (req, res) {
		models.User.findAll().success(function(users) {
			res.end(JSON.stringify(users));
		});		
	})

	// Create a new user
	.post('/', function (req, res) {

		if (! req.body['email']) {
			res.end('Email not found.');
		}

		if (req.body['password'] !== req.body['confirmed_password']) {
			res.end('Password does not match.');
		}

		req.body['password'] = crypto.createHash('md5').update(req.body['password']).digest('hex');

		models.User.create(req.body).success(function(user) {
			user.save().success(function (){
				res.redirect(201, '/users/' + user.id);
			});
		});
	})

	// Display a single user as HTML
	.get('/:id', function (req, res) {
		models.Language.findAll().success(function(languages) {
			models.User.find(req.params.id).success(function(user) {
				res.render('user', {
					user: user,
					languages: languages
				});
			});
		});
	});


module.exports = router;