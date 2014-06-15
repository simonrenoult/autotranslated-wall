var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var debug = require('debug')('autotranslated-wall');
var MsTranslator = require('mstranslator');

// =============================================
app.use(bodyParser.json());

// =============================================
var server = app.listen(3001, function() {
	debug('Proxy server listening on port ' + server.address().port);
});

// =============================================
var client = new MsTranslator({client_id:"lo10translationTest", client_secret: "K5ncB7ZVkcdqQTbowBcLmQvt+GbGH7ELG2p+8cBiYac="});

// Data
// =============================================
var raw = [];

// Routes
// =============================================
app.post('/', function(req, res) {

	if( ! req.body['content'] ) {
		res.status(400).end('No content provided.');
	}
	else if( ! req.body['language_to'] ) {
		res.status(400).end('No language provided');
	}
	else
	{
		if( raw[req.body['content']] && raw[req.body['content']][req.body['language_to']] ) {

			var translation = raw[req.body['content']].filter(function(item) {
				return ( item.to == req.body['language_to'] );
			});

			res.end(JSON.stringify(raw[req.body['content']][req.body['language_to']]));
		}
		else
		{

			client.initialize_token(function(keys){
				client.detect({ text: req.body['content']}, function(err, data) {

					var language_from = data;

					client.translate({
						from: language_from,
						to: req.body['language_to'],
						text: req.body['content']
					}, function(err, data) {

						if(  ! raw[req.body['content']] )
							raw[req.body['content']] = [];


						raw[req.body['content']][req.body['language_to']] = data;

						res.end(JSON.stringify(data));

					});
				});
			});
		}
	}
});