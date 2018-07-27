// nao precisa require do mocha, porque executa com node_modules/mocha/bin/mocha 
// tem outros packages: Jasmine, QUnit, junit, ...

// executar com: NODE_ENV=test node_modules/mocha/bin/mocha 
// OU npm test (porque foi definido em scripts no package.json)

var app = require('../config/express')(); 
var request = require('supertest')(app);

describe('ProdutosController', function() {

	beforeEach(function(done) {
		var connection = app.infra.connectionFactory();
		connection.query("DELETE FROM produtos", function(err, res) {
			// TODO: usar libs como node-database-cleaner
			if (!err) 
				done();
			else
				console.log(err);
		});
		connection.end();
	});

	describe("#[GET] in /produtos", function() {
		it('Listagem JSON', function(done) {
			request.get('/produtos')
				   .set('Accept', 'application/json')
				   .expect('Content-type', /json/) // expressao regular, possua a palavra /json/
				   .expect(200, done); 
		});

		it('Listagem HTML', function(done) {
			request.get('/produtos')
				   .set('Accept', 'text/html')
				   .expect('Content-type', /html/) 
				   .expect(200, done); 
		});
	});

	describe("#[POST] in /produtos", function() {

		it('Novo produto com titulo invalido, espera retorno JSON', function(done) {
			// clearTables(function() { // o mocha ja permite definir funcoes que devem ser executadas antes dos testes
			var produto = {
				titulo: '',
				descricao: 'description',
				preco: 500.00
			}
			request.post('/produtos')
				   .set('Accept', 'application/json')
				   .send(produto)
   				   .expect('Content-type', /json/) 
				   .expect(400, done); 
			// });
		});

		it('Novo produto com preco invalido, espera retorno HTML', function(done) {
			var produto = {
				titulo: 'title',
				descricao: 'description',
				preco: '100,0'
			}
			request.post('/produtos')
				   .set('Accept', 'text/html')
				   .send(produto)
				   .expect('Content-type', /html/) 
				   .expect(400, done); 
		});

		it('Novo produto valido', function(done) {
			var produto = {
				titulo: 'title',
				descricao: 'description',
				preco: 100.0
			}
			request.post('/produtos')
				   .send(produto)
				   .expect(303, done); 
		});
	});

});


// se passar done: ele nao acaba o teste ate invocar a funcao
// se nao tiver, na hora da callback get, por exemplo, ele ja iria finalizar

// BEFORE SUPERTEST
/*
var http = require('http');
var assert = require('assert');

describe('#ProdutosController', function() {

	it('Listagem JSON', function(done) {
		var config = { 
			hostname: 'localhost',
			port: 3000,
			path: '/produtos', 
			headers: {
				'Accept': 'application/json'
			}
		};

		http.get(config, function(res) { 
			assert.equal(res.statusCode, 200);
			assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
			done();
		});

		
	});

});
*/