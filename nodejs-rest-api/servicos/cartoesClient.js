//var restify = require('restify');
var clients = require('restify-clients');

function ClienteCartoes() {
	this._client = clients.createJsonClient({
		url: 'http://localhost:3001'
	});
}

ClienteCartoes.prototype.autoriza = function(cartao, callback) {
	this._client.post('/cartoes/autoriza', cartao, callback);
}

module.exports = function() {
	return ClienteCartoes;
}