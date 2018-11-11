const express = require('express');
const router  = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

const passportOptions = { 
    session: false, 
    failureRedirect: '/',
    badRequestMessage : 'Please fill the form',
    failureFlash: true
}

router.post('/login', 
    passport.authenticate('local', passportOptions),
    function (req, res, next) {
        var token = jwt.sign({'id': req.user.id}, 'my_secret');
        res.cookie('jwt', token); 
        res.redirect('/admin');
    }
);

module.exports = router;