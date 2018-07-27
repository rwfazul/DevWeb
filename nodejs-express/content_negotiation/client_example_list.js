/* e.g.: android_client */

// outra opcao: 
// curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/produtos 
// curl -i -H "Accept: application/json" http://localhost:3000/produtos 

var http = require('http');

var config = { 
	hostname: 'localhost',
	port: 3000,
	path: '/produtos', // sem headers criaria /produtos/json a rota /produtos/json dando response.json(results)
	headers: {
		'Accept': 'application/json' // 'Accept': 'text/html'
	}
};

http.get(config, function(response) {
	console.log(response.statusCode);
	response.on('data', function(body) { // quando dados da requisicao estiverem prontos
		console.log(body.toString());
	});
});
