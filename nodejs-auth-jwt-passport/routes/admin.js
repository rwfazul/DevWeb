var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('dashboard', { username: req.user['username'] });
});

module.exports = router;