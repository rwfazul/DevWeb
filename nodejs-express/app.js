var app = require('./config/express')(); 
// var rotasProdutos = require('./app/routes/produtos')(app); // agora esta sendo carregado com o express-load (depreciado) ou consign

var http = require('http').Server(app); // seta que quem trata requiscao eh o express
var io = require('socket.io')(http); // argumento = request handler do node.js
 
app.set('io', io); // disponibiliza variavel

http.listen(3000, function() { // agora chama o listen do obj do node (e nao direto do express com app.listen)
	console.log("server is running");
});

/*
var porta = process.env.PORT || 3000;
var server = http.listen(porta, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
*/