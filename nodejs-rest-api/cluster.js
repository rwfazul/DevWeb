var cluster = require('cluster');
var os = require('os');

var cpus = os.cpus();
// console.log(cpus);

console.log('executando thread...');

if (cluster.isMaster) { // slave nao pode dar fork
	console.log('master thread');
	cpus.forEach(function() {
		cluster.fork(); // executa todo file
	});

	// listeners
	cluster.on('listening', function(worker) { // ao criar os clusters
		console.log('cluster conectado ' + worker.process.pid)
	});

  	/* cluster.on("disconnect", worker => {
        console.log("cluster %d desconectado", worker.process.pid);
    }); /*

	cluster.on('exit', worker => { // quando algum no cair
		console.log('cluster %d desconectado', worker.process.pid);
		cluster.fork();
	});
} else {
	console.log('slave thread');
	// mesmo tendo 4 nos rodando na mesma porta, a API de clusters
	// sabe que o mestre eh o responsavel por gerenciar as requisicoes 
	// escalonar, balancear a carga, etc.
	require('./index.js');
}