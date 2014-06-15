var express = require('express');
var router = express.Router();

router

	// Render the home page
	.get('/', function (req, res) {
	  res.render('index', {title: 'Wall'});
	})

	// Render the about page
	.get('/about', function (req, res) {
		res.render('about');
	});

module.exports = router;
