var fs = require('fs'); 

// callback executa ao final do processamento anterior, objetivo aqui eh criar um fluxo de dados (que executa como uma operacao concorrente) 

fs.createReadStream('imagem-teste.jpg')
  .pipe(fs.createWriteStream('imagem-teste-output.jpg'))
  .on('finish', function(error) { //listener para saber quando acaba
		console.log('arquivo escrito com stream')
  }); 


// node streamFileReader.js <filename>
// var filename = process.argv[2];


// curl -X POST http://localhost://3000/upload/imagem --data-binary @imagem-teste.jpg -H "Content-type: application/octet-stream" -v
// Expect: 100-continue