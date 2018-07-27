var soap = require('soap');

function CorreiosSOAPClient() {
	this._url = 'http://ws.correios.com.br/calculador/CAlcPRecoPrazo.asmx?wsdl';
}

CorreiosSOAPClient.prototype.calculaPrazo = function(args, callback) { // api converte req/res para xml
	soap.createClient(this._url, function(err, client) {
		console.log('client soap criado');
		client.CalcPrazo(args, callback);
	});
};

module.exports = function() {
	return CorreiosSOAPClient;
}