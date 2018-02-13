var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');

router.post('/', function(req){
    console.log(req.body.username);
    console.log(req.body);
    // username = req.get('username')
    // email = req.get('email')
    // password = req.get('password')

    // console.log(username)
});

module.exports = router;