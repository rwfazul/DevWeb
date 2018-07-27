/* e.g.: android_client */

var http = require('http');

var config = { 
	hostname: 'localhost',
	port: 3000,
	path: '/produtos',
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json'
	}
};

var client = http.request(config, function(response) { // request so monta o objeto (requiscao eh disparada no end)
	console.log(response.statusCode);
	response.on('data', function(body) { 
		console.log(body.toString());
	});
});

var produto = {
	titulo: 'test insert with json',
	descricao: 'a little decription',
	preco: 100.50
}

client.end( JSON.stringify(produto) ); //dispara requisicao de fato, precisou nas config do express: app.use(bodyParser.json());
