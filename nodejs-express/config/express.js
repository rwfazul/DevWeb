// nao precisa executar essa parte toda vez que carregar o modulo
var express = require('express'); // path default = node_modules
var consign = require('consign'); // var load = require('express-load'); // (depreciado)
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');

module.exports = function() {
	var app = express();

	app.set('view engine', 'ejs');
	app.set('views', './app/views'); // 'app/views' funcionaria, pq eh o caminho relativo de onde esta subindo o server ('app.js' que esta na raiz)
	
	app.use(express.static('./app/public')); // tenta resolver recursos estaticos em public (. pq eh a partir do app.js (onde express eh carregado))
	app.use(bodyParser.urlencoded({ extended: true })); // precisa ser antes de carregar os modulos, se nao vai exportar os modulos sem o middleware
	app.use(bodyParser.json()); // aceita json tambem,
	app.use(methodOverride('_method')); 
	app.use(expressValidator()); // middleware order importa: valida dps de ter o json, etc (embora funcione inverso)

	consign({ cwd: 'app' }) // cwd: a partir de qual pasta procurar (facilita searching do load)
		.include('infra')
		.then('routes')
		.into(app);

	/* PARA AUTENTICACAO VER: http://www.passportjs.org/ OU https://jwt.io/ */

	app.use(function(req, res, next) { // tem que ser depois das rotas.. caso nao ache cai aqui
		if ( process.env.NODE_ENV == 'production' ) { // se nao for producao exibe o erro normal
			res.status(404).render('erros/404');
			return;
		}
		next();
	});

	app.use(function(err, req, res, next) { // se algum erro acontecer ele chama o middleware com 4 argumentos (erro como primeiro arg)
		if ( process.env.NODE_ENV == 'production' ) {
			res.status(500).render('erros/500'); // para testar tenta mudar nome do database, etc. da connectionFactory
			return;
		}
		next(err); 
	});

    // tem que colocar na ordem (final), caso contrário ele passa pelo middleware e 
    // ainda não vai ter acontecido nenhum erro.

	return app;
}

// por default o express-load ja carrega e invoca o objeto, no caso da conexao
// eh melhor separar com um wrapper (ex. nao precisa conectar com bd assim que 
// carregar a aplicacao. ver connnectionFactory);

// req - middleware (bodyParser) - outros.. (e.g. autentificacao) - funcao que trata a requisicao

 // É importante que o uso do methodOverride fique depois do uso do bodyParser,
 // pois somente após os parâmetros da requisição serem devidamente
 // incluídos nos devidos objetos é que o method_override poderá ser usado

 // a ordem dos Middlewares importa para que quando um seja carregado, 
 // o express já tenha carregado todas as outras dependências das quais ele necessita

 // request express -> function -> function -> ... -> rota
 // function (middlewares) setadas com use(), entao:
 // request -> bodyparser -> methodoverride -> expressValidator -> myFunc -> ... -> rota