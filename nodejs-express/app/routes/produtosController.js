// var connectionFactory = require('../infra/connectionFactory'); // agora esta usando express-load (depreciado) ou consign

module.exports = function(app) {

	var listaProdutos = function(request, response, next) { // next = fluxo das funções que foram executadas no Express, permitindo setar a proxima
		var connection = app.infra.connectionFactory(); // usando express-load
		var produtosDAO = new app.infra.ProdutosDAO(connection); // sem o new nao cria contexto de uso novo e acaba usando o objeto do express-load/consign

		produtosDAO.findAll(function(errors, results) { // callback quando consulta executar
			if (errors) return next(errors); // pula para proxima funcao (no caso a que lida com erros)
			// if (errors) return next(new Error("Couldn't find products: " + error);
			//response.send(results); // envia apenas o json
			response.format({
				html: function() { // se Accept: html
					response.render('produtos/lista', { produtos: results });
				},
				json: function() {
					response.json(results);
				}
			});
		});

		connection.end();
	};

	/* LIST */
	app.get('/produtos', listaProdutos);

	/* FORM NEW PRODUTO */
	app.get('/produtos/new', function(request, response, next) {
		response.render('produtos/form');
	});

	/* CREATE */
	app.post('/produtos', function(request, response, next) {
		var produto = request.body; // express precisa uma lib para tratar requisicoes e preencher body (e.g. body-parser)
		if ( !isValidProduct(request, response, produto) ) return;

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.create(produto, function(errors, results) {
			if (errors) return next(errors);
			// listaProdutos(request, response); // problema com reload
			// response.redirect('/produtos');
			response.redirect(303, '/produtos');
		});

		connection.end();
	});

	/* READ */
	app.get('/produtos/:id', function(request, response, next) {
    	var id = request.params.id;
		var produto = request.body; // express precisa uma lib para tratar requisicoes e preencher body (e.g. body-parser)
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.find(id, function(errors, results) {
			if (errors) return next(errors);
			response.render('produtos/form', { produto: results[0] });
		});

		connection.end();
	});	

	/* UPDATE */
	app.put('/produtos', function(request, response, next) {
		var produto = request.body;
		if ( !isValidProduct(request, response, produto) ) return;

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.update(produto, function(errors, results) {
			if (errors) return next(errors);
			response.redirect('/produtos');
		});

		connection.end();
	});	

	/* DELETE */
	app.delete('/produtos', function(request, response, next) {
		var id = request.body.id;
		var produto = request.body; // express precisa uma lib para tratar requisicoes e preencher body (e.g. body-parser)
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.remove(id, function(errors, results) {
			if (errors) return next(errors);
			// listaProdutos(request, response); // problema com reload
			response.redirect('/produtos');
		});

		connection.end();
	});

	function isValidProduct(request, response, produto) {
		request.assert('titulo', 'Por favor, preencha o título').notEmpty();
		request.assert('preco', 'Por favor, preencha um valor válido').isFloat();
		var errors = request.validationErrors();
		if ( errors ) {
			response.status(400);
			response.format({
				html: function() { 
					response.render('produtos/form', { invalidProduto: produto, validationErrors: errors });
				},
				json: function() {
					response.json(errors);
				}
			});
			return false;
		}
		return true;
	}

}