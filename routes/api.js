var express = require('express');
var router = express.Router();
var virtualbox = require('virtualbox');

/* GET home page. */
router.get('/machines', function(req, res, next) {

    virtualbox.list(function list_callback(machines, error) {
        if (error) res.send(error);

        console.log(machines);
        res.json(machines);
    });


});

module.exports = router;
