const logger = require('../servicos/logger.js');

module.exports = function(app) {

	const PAGAMENTO_CRIADO = 'CRIADO';
	const PAGAMENTO_CONFIRMADO = 'CONFIRMADO';
	const PAGAMENTO_CANCELADO = 'CANCELADO';

	const FORMA_PAGAMENTO_CARTAO = "cartao";

	app.get('/pagamentos', function(req, res) {
		res.send('Ok.');
	});

	app.post('/pagamentos/pagamento', function(req, res) {
		var errors = getRequestErrors(req);
		if (errors) {
			logger.info('erros de validacao encontrados');
			return res.status(400).send(errors);
		}
		logger.info('processando novo pagamento');
		var pagamento = req.body['pagamento']; // req.body.pagamento
		pagamento.status = PAGAMENTO_CRIADO;
		pagamento.data = new Date;

		var connection = app.persistencia.connectionFactory();
		var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

		pagamentoDAO.create(pagamento, function(err, result) {
			if (err) {	
				logger.info('erro ao inserir pagamento: ' + err);
				return res.status(500).send(err);  // como ja foi validado pode retornar 500
			}
			logger.info('pagamento criado');
			pagamento.id = result.insertId;

			// MEMCACHED
			/* var memcachedClient = app.servicos.memcachedClient();
			client.set('pagamento-' + pagamento.id, pagamento, 60000, function(err) { 
				console.log('nova chave adicionada ao cache: pagamento-' + pagamento.id);
			}); */

			var response = createResponse(pagamento, req, res);
			if (pagamento.forma_de_pagamento == FORMA_PAGAMENTO_CARTAO) {
				var cartao = req.body['cartao'];
				logger.info('enviando dados do cartao');
				var clienteCartoes = new app.servicos.cartoesClient();
				clienteCartoes.autoriza(cartao, function(cErr, cReq, cRes, cData) {
					if (cErr) {	
						logger.info(cErr);
						return res.status(400).json(cErr.body);
					}
					logger.info(cData);
					response['dados_do_cartao'] = cData;
				});
			} 
			res.status(201).json(response);
		});

		connection.end();
	});

	app.get('/pagamentos/pagamento/:id', function(req, res) {
		var id = req.params.id;
		logger.info('consultando pagamento ' + id);
		
		// MEMCACHED
		/* var memcachedClient = app.servicos.memcachedClient();
		client.get('pagamento-' + id, function(err, data) {
			if (err || !data) {
				console.log('MISS - Chave nao encontrada');
				// codigo da consulta normal no BD
				// valeria a pena adicionar na cache? (localidade temporal)
			} else {
				console.log('HIT - valor: ' + JSON.stringify(data));
				res.json(data); 
			}
		}); */

		var connection = app.persistencia.connectionFactory();
		var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

		pagamentoDAO.find(id, function(err, result) {
			if (err) {	
				logger.info('erro ao consultar pagamento: ' + err);
				return res.status(500).send(err); 
			}
			logger.info('pagamento '+ id + ': ' + JSON.stringify(result));
			res.json(result); // status code default = 200	
		});
	});

	app.put('/pagamentos/pagamento/:id', function(req, res) {
		var pagamento = {};	
		var id = req.params.id;

		pagamento.id = id;
		pagamento.status = PAGAMENTO_CONFIRMADO;

		var connection = app.persistencia.connectionFactory();
		var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

		pagamentoDAO.update(pagamento, function(err, result) {
			if (err) {	
				logger.info('erro ao confirmar pagamento: ' + err);
				return res.status(500).send(err); 
			}
			logger.info('pagamento confirmado');
			/* ATUALIZAR PAGAMENTO NO MEMCACHED SE ACHAR NECESSARIO (prestar atencao no fato
			   dos dados estarem com timeout baixo, ex. 1min, entao talvez nao precise, a menos
			   que queira inserir novamente apos update). Outro ponto: se ngm sobreescrever, 
			   por default, o dado pode continuar na cache mesmo apos o timeout. Nesse caso
			   ou atualiza ou seta para deletar de verdade */
			res.json(pagamento);
		});

		connection.end();
	});

	// exclusao logica
	app.delete('/pagamentos/pagamento/:id', function(req, res) {
		var pagamento = {};
		var id = req.params.id;

		pagamento.id = id;
		pagamento.status = PAGAMENTO_CANCELADO;

		var connection = app.persistencia.connectionFactory();
		var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

		pagamentoDAO.update(pagamento, function(err, result) {
			if (err) {	
				logger.info('erro ao cancelar pagamento: ' + err);
				return res.status(500).send(err); 
			}
			logger.info('pagamento cancelado');
			/* ATUALIZAR PAGAMENTO NO MEMCACHED SE ACHAR NECESSARIO (prestar atencao no fato
			   dos dados estarem com timeout baixo, ex. 1min, entao talvez nao precise, a menos
			   que queira inserir novamente apos update). Outro ponto: se ngm sobreescrever, 
			   por default, o dado pode continuar na cache mesmo apos o timeout. Nesse caso
			   ou atualiza ou seta para deletar de verdade */
			res.status(204).json(pagamento);
		});

		connection.end();
	});

	function getRequestErrors(req) {
		req.assert('pagamento.forma_de_pagamento', 'Forma de pagamento é obrigatória').notEmpty();
		req.assert('pagamento.valor', 'O valor é obrigatório e deve ser um decimal').notEmpty().isFloat();
		req.assert('pagamento.moeda', 'Moeda deve ser valida (max: 3 caracteres)').len({ max: 3 }); // also: len(3,3) or isLength(3,3) (len eh um alias to isLength)
		var errors = req.validationErrors();
		return errors ? errors : false;
	}

	function createResponse(pagamento, req, res) {
		res.location('/pagamentos/pagamento/' + pagamento.id)
		return {
			dados_do_pagamento: pagamento,
			links: [ // HATEOAS
				{
					// href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
					href: "http://" + req.headers.host + "/pagamentos/pagamento/" + pagamento.id, // uri
					rel: "confirmar",
					method: "PUT"
				},
				{
					href: "http://" + req.headers.host + "/pagamentos/pagamento/" + pagamento.id,
					rel: "cancelar",
					method: "DELETE"
				}
			]
		};
	}

}

// curl http://localhost:3000/pagamentos/pagamento 
//     -X POST 
//     -H "Content-type: application/json" 
//     -d 'JSON_FILE (literal o arquivo)' 
//     -v | json pp

// Note: Unnecessary use of -X or --request, POST is already inferred.
// ; echo apenas para quebrar a linha da resposta
// opcao melhor | json_pp

// curl  http://localhost:3000/pagamentos/pagamento -H "Content-type: application/json" -d @path_to/pagamento.json -v | json_pp

// curl -X DELETE http://localhost:3000/pagamentos/pagamento/24 -v | json_pp
// curl -X PUT http://localhost:3000/pagamentos/pagamento/24 -v | json_pp

// curl http://localhost:3000/correios/calculo-prazo -H "Content-type: application/json" -d @dados_entrega.json -v | json_pp