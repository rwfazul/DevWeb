const {transports, createLogger, format} = require('winston');
var fs = require('fs');

if ( !fs.existsSync('logs') ) { // versao sincrona de fs.exists
    fs.mkdirSync('logs');
}

module.exports = createLogger({
    format: format.combine(
        format.timestamp(),
        // format.prettyPrint()
        format.json()
    ),
    transports: [
        // new transports.Console(),
        new transports.File({
        	filename: 'logs/payfast.log', 
        	level: 'info'
        })
    ]
});

// const logger = ...
// logger.log('info', 'Log info utilizando winston 1'); // tipo do log explicito
// logger.info('Log info utlizando winston 2'); // outra forma

/*
var winston = require('winston');
var logger = winston.createLogger({
	transports: [ // nivel do log - info, debug, error
		new winston.transports.File({ // local ad escrita file, console, etc.
			level: 'info',
			filename: 'logs/payfast.log',
			maxsize: 10000, // aprox 10MB, depois ele cria outro
			maxFiles: 10 // maximo de arquivos para esse tipo de log
		})
	]
});
*/