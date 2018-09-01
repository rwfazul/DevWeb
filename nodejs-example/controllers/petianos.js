var connectionFactory = require('../persistence/connectionFactory')(),
    petianoDAO 		  = require('../persistence/PetianoDAO');

module.exports = {

    getPetianos : function(req, res) {
		var connection = connectionFactory();
		var pdao = new petianoDAO(connection);
		pdao.findAll(function(err, result) {
			if (err) return res.status(500).send(err); 
			res.json(result); // default status code = 200	
		});
		connection.end();
    },

    getPetiano : function(req, res) {
		var connection = connectionFactory();
		var pdao = new petianoDAO(connection);
		pdao.find(req.params.id, function(err, result) {
			if (err) return res.status(500).send(err); 
			res.json(result); 
		});
		connection.end();
	},

    createPetiano : function(req, res) {
		var errors = requestHasErrors(req);
		if (errors) return res.status(400).send(errors);

    	var petiano = req.body['petiano'];
		var connection = connectionFactory();
		var pdao = new petianoDAO(connection);

		pdao.create(petiano, function(err, result) {
			if (err) return res.status(500).send(err); 
			petiano.id = result.insertId;
			res.status(201).json( createResponse(petiano, req, res) );
		});

		connection.end();
	},

    updatePetiano : function(req, res) {
		var petiano = req.body['petiano'];
		var connection = connectionFactory();
		var pdao = new petianoDAO(connection);

		pdao.update(req.params.id, petiano, function(err, result) {
			if (err) return res.status(500).send(err); 
			res.json(petiano);
		});

		connection.end();    
	},

    deletePetiano : function(req, res) {
		var connection = connectionFactory();
		var pdao = new petianoDAO(connection);

		pdao.remove(req.params.id, function(err, result) {
			if (err) return res.status(500).send(err); 
			res.status(204).json(result);
		});

		connection.end();
	}

}

function requestHasErrors(req) {
	req.assert('petiano.nome', 'nome eh obrigatorio').notEmpty();
	req.assert('petiano.salario', 'salario eh um numero obrigatorio').notEmpty().isFloat();
	var errors = req.validationErrors();
	return errors ? errors : false;
}

function createResponse(petiano, req, res) {
	var location = '/petianos/petiano/' + petiano.id;
	res.location(location)
	return {
		_links: [ // HATEOAS
			{
				href: "http://" + req.headers.host + location,
				rel: "self",
				method: "PUT"
			},
			{
				href: "http://" + req.headers.host + location,
				rel: "self",
				method: "DELETE"
			}
		]
	};
	
}