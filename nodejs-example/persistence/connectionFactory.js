var mysql = require('mysql');

function createConnection() {
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '1234',
		database: 'petnode'
	});
}

module.exports = function() {
	return createConnection;
}