var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');

router.post('/', function(req){
    
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;

    new User({
        username: req.body.username,
        email: req.body.username,
        password: req.body.password,
    }).save()
    //username = req.POST.get('username', None);
    console.log(req.body.username);
    // username = req.get('username')
    // email = req.get('email')
    // password = req.get('password')

    // console.log(username)
});

module.exports = router;