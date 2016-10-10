var express = require('express');
var router = express.Router();
var User = require('./models/user.js');

router.post('/register', function(req, res, next) {
    User.post(req.body, 1).then(function(doc) {
        res.json(doc);
    }, function(err) {
        res.json(err);
    })
});

function basicRoutes(name, model) {
    router.post(name + 's', function(req, res, next) {

    })

}

module.exports = router;