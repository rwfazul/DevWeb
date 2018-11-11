var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// if needed you can put a middleware or some verification
	// to check if there is a valid token already stored in cookies
	// and if there is you can redirect to /admin dashboard

  	res.render('index', { message: req.flash('error') });
});

module.exports = router;
