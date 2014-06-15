var http = require('http');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var models = require('../models');

router

	/**
	 * Discussion wall
	 */
	.get('/', function(req, res) {

		/*models.Message.findAll().success(function(messages) {

			messages.forEach(function(message) {

				models.User.find(message.UserId).success(function(user) {
					if( user )
						message.alias = user.alias;
				});

				models.Language.find(message.LanguageId).success(function(language) {
					if(language)
						message.language = language.short_name;
				});

			});

			models.User.findAll().success(function(users) {
				res.render('wall', { title: "Wall", messages: messages, users: users});
			});

		});*/

		res.render('wall', { title: "Wall" });

	})

	.post('/', function(req, res){

		if( ! req.body['content'] ) {
			res.status(400).redirect('/wall');
		}
		else
		{
			
			models.Language.findAll().success(function(languages) {

				languages.forEach(function(language) {

					var post = http.request({
						host: 'localhost',
						port: '3001',
						path: '/',
						method: 'POST',
						headers: {
							'Content-Type' : 'application/json'
						}
					},
					function(res) {
						
						res.on('data', function(chunk) {
							console.log(chunk);
						});

						res.on('error', function(data) {
							console.error(data);
						});
					});

					post.write(JSON.stringify({
						content: req.body['content'],
						language_to: language.short_name
					}));
					post.end();

				});

			});			

			models.Message.create({
				content : req.body['content'],
				LanguageId: req.cookies.language_id,
				UserId: req.cookies.alias_id
			})
			.success(function(message) {
				res.status(201).redirect('/wall');
			});
		}
	})

module.exports = router;