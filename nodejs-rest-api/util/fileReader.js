var fs = require('fs'); // file system (faz parte do core do node)

fs.readFile('imagem-teste.jpg', function(error, buffer) { // le todo arquivo e depois callback (dados em memoria)
	console.log('arquivo lido');

	fs.writeFile('imagem-teste-output.jpg', buffer, function(err) {
		console.log('arquivo escrito')
	})

});