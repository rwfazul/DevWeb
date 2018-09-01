var express = require('express'),
    router = express.Router(),
    petianos = require('../controllers/petianos');

router.route('/')
	.get(petianos.getPetianos) /* FIND ALL */
	.post(petianos.createPetiano); /* CREATE */

router.route('/:id') 
	.get(petianos.getPetiano) /* FIND */
	.put(petianos.updatePetiano) /* UPDATE */
	.delete(petianos.deletePetiano); /* REMOVE */
	
module.exports = router;

/* TESTES
 * insert: $ curl -X POST http://localhost:3000/petianos/ -H "Content-type: application/json" -d @path/to/file.json -v | json_pp
 * update: $ curl -X PUT http://localhost:3000/petianos/1/  -H "Content-type: application/json" -d @path/to/file.json -v | json_pp
 * find: $ curl -X GET http://localhost:3000/petianos/1/ -v | json_pp
 * find all: $ curl -X GET http://localhost:3000/petianos/ -v | json_pp
 * remove: $ curl -X DELETE http://localhost:3000/petianos/1/ -v | json_pp
 */
