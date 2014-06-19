var express = require('express');
var router = express.Router();
var models = require('../models');

router

	// Render the home page
	.get('/', function (req, res) {

		models.Language.findAll().success(function(languages) {
			res.render('index', {title: 'Wall', languages: languages});
		});
	  
	})

	// Render the about page
	.get('/about', function (req, res) {
		res.render('about');
	});

module.exports = router;
