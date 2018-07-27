module.exports = function(app) {
	
	app.get('/promocoes/form', function(request, response, next) {
		var connection = app.infra.connectionFactory(); 
		var produtosDAO = new app.infra.ProdutosDAO(connection); 
		produtosDAO.findAll(function(errors, results) {
			if (errors) return next(errors); 
			response.render('promocoes/form', { livros: results });
		});
		connection.end();
	});

	app.post('/promocoes', function(request, response) {
		var promocao = request.body; 
		app.get('io').emit('novaPromocao', promocao); // coloca um evento na fila do node.js
		response.redirect(303, 'promocoes/form');
	});

}