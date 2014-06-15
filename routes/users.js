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

		if (! req.body['alias']) {
			res.end('Alias not found.');
		}

		if ( ! req.body['LanguageId'] ) {
			res.end('Language must be provided.');
		}

		models.User.create(req.body).success(function(user) {
			user.save().success(function (){

				res.cookie('alias', user.alias, {maxAge: 1000*60*60*24*365});
				res.cookie('alias_id', user.id, {maxAge: 1000*60*60*24*365});
				res.cookie('language_id', user.LanguageId, {maxAge: 1000*60*60*24*365});

				res.status(201).redirect('/wall');
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