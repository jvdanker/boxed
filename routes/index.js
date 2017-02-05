var express = require('express');
var router = express.Router();
var virtualbox = require('virtualbox');

/* GET home page. */
router.get('/', function(req, res, next) {
    virtualbox.list(function list_callback(machines, error) {
        if (error) throw error;

        res.render('index', { title: machines });
        console.log(machines);
    });

});

module.exports = router;
