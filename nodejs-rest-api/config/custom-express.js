var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan'); // intercepta requisoes p/ logs
var logger = require('../servicos/logger.js')

module.exports = function() {
	var app = express();

	app.use(morgan('common', { // common, segue padrao Apache common log output
		stream: { // nao parece aplicacao enquanto ta escevendo o log
			write: function(data) {
				logger.info(data);
			}
		}
	}));

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
	app.use(expressValidator())

	consign()
		.include('controllers')
		.then('persistencia')
		.then('servicos')
		.into(app);

	return app;
}