var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');
var Sessions = require('../models/User');
// var Sessions = require('../models/Sessions');
const bcrypt = require('bcrypt');
//const session = require('express-session');

router.post('/create', function(req, res){
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        new User({
            user_name: req.body.username,
            email: req.body.email,
            password: hash,
        }).save()
        .catch((error) => console.log('Duplicate Entry'));//to be handled by react in createComp.js
    });
    res.redirect('/user/confirm');
});

router.post('/login', function(req, res){
    User.where({User_name: req.body.username}).fetch().then(function(login){
        bcrypt.compare(req.body.password, login.attributes.password, function(err,check){
            if(check){
                console.log('in login')
                req.session.username = req.body.username;
                req.session.save();
                console.log(req.session.username);
                res.redirect('/map');
            }
            else{
                console.log("Incorrect username/password");
            }
        })
    })
});

router.post('/verify', function(req,res){
    console.log('In verify');
    Sessions.where({session_id: req.session.id}).fetch().then(function(ver){
        if(!ver){
            res.redirect('/user/login');
        }
    })
})
module.exports = router;