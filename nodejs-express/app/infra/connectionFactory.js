var mysql = require('mysql');

function createDBConnection() {
	/* if ( !process.env.NODE_ENV || process.env.NODE_ENV == 'production') { // default: 'development'
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '1234',
			database: 'app_nodejs'
		});
	} 
	else */ if (process.env.NODE_ENV == 'test') { 
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '1234',
			database: 'app_nodejs_test'
		});
	} else {
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '1234',
			database: 'app_nodejs'
		});
	}
	/*
	if (process.env.NODE_ENV == 'production') {
		var url = process.env.CLEARDB_DATABASE_URL;
		var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
		return mysql.createConnection({
			host:grupos[3],
			user:grupos[1],
			password:grupos[2],
			database:grupos[4]
		});
	}
	*/
}

// wrapper
module.exports = function() {
	return createDBConnection;	
}


// outro jeito:
// exports.connect = createDBConnection;
// e para usar: require('./connectionFactory').connect();
// ou cria prototype