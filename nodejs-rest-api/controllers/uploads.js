var fs = require('fs');

module.exports = function(app) {

	// os dados ja vem em stream por conta do heade application/octet-stream (o express suporta)
	app.post('/upload/imagem', function(req, res) {
		console.log('recebendo imagem');
		// var body = req.body; // estaria lendo quando a req ja tivesse o dado inteiro (buffer mode)
		// req ja implementa a api de stream
		var filename = req.headers.filename;
		if ( !filename ) filename = String( new Date().getTime() );
   	    if ( filename.indexOf('.') < 0 ) filename += '.jpg';
		req.pipe(fs.createWriteStream('files/' + filename))
		   .on('finish', function(error) {
		   		console.log('arquivo ' + filename + ' escrito');
		   		var msg = {
		   			msg: "arquivo recebido e escrito",
		   			filename: filename
		   		}
		   		res.status(201).json(msg);
		   });
	});

}

// curl http://localhost:3000/upload/imagem --data-binary @imagem-teste.jpg -H "Content-type: application/octet-stream" -H "filename: enviada.jpg" -v | json_pp
// Expect: 100-continue