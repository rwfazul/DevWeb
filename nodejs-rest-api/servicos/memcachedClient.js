// antes instalar e inicializa/sobe o memcached: $ mencached -vv 
// -vv (saida verbosa em segundo nivel)
/* var memcached = require('memcached'); // npm install --save memcached

function createMemcachedClient() {
	var client = new memcached('localhost:11211', {
		retries: 10,  // em quantos nós ele pode buscar no max
		retry: 10000, // se nao conseguir consultar um server, espera o tempo (ms) para tentar novamente
		remove: true  // se nao conseguir depois de tentativas falhas (defindas pela chave 'failures'), remove o nó da pool (considera como morto)
	});
	return client;
}

module.exports = function() {
	return createMemcachedClient;
} */



/* usado nas rotas em pagamento.js
client.set('pagamento-20', {'id': 20}, 60000, function(err) { // 60000ms (1min) ira manter o dado na cache
	console.log('nova chave adicionada ao cache');
}); 

client.get('pagamento-20', function(err, data) {
	if (err || !data) {
		console.log('MISS - Chave nao encontrada');
	} else {
		console.log('HIT - valor: ' + JSON.stringify(data));
	}
}); 
*/