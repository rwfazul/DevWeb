var app  = require('./config/custom-express')();

app.listen(3000, function() { // '() =>'' or 'name =>'
	console.log('server is running at port 3000');
});