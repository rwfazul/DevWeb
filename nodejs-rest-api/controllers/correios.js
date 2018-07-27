module.exports = function(app) {

	app.post('/correios/calculo-prazo', function(req, res) {
		var dadosDaEntrega = req.body;
		var correiosSOAPClient = new app.servicos.correiosSOAPClient();

		correiosSOAPClient.calculaPrazo(dadosDaEntrega, function(err, result) {
			if (err) return res.status(500).send(err);
			console.log('prazo calculado');
			res.json(result);
		});

	});

}