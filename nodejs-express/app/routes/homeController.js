module.exports = function(app) {

	app.get('/', function(request, response, next) {
		var connection = app.infra.connectionFactory(); 
		var produtosDAO = new app.infra.ProdutosDAO(connection); 
		produtosDAO.findAll(function(errors, results) { 
			if (errors) return next(errors);
			response.render('home/index', { livros: results });
		});
		connection.end();
	});

}