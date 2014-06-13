var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

// USERS Routes
// ============================================

router

	// Display the user list in HMTL
	.get('/', function (req, res) {
		User.find({}, function (err,  users) {
			res.render('users', { users : users });
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

		var user = new User ({ 
			email: req.body['email'], 
			password: crypto.createHash('md5').update(req.body['password']+req.body['email']).digest('hex')
		})

		user.save();

		res.redirect(201, '/users/' + user._id);

	})

	// Display a single user as HTML
	.get('/:id', function (req, res) {
		User.findById(req.params.id, function (err, user) {
			if (err) console.log(err);

			res.render('user', { user: user });
		});
	});

module.exports = router;
