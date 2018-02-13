var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');

const bcrypt = require('bcrypt'); //is there a better place to put this? 


router.post('/create', function(req){

    // User.where('user_name', req.body.username).fetch().then(function(name){
    //     if(!name){
    //         User.where('email', req.body.email).fetch().then(function(mail){
    //             if(!mail){
    //                 bcrypt.hash(req.body.password, 10, function(err, hash) {
    //                     new User({
    //                         user_name: req.body.username,
    //                         email: req.body.username,
    //                         password: hash,
    //                     }).save()
    //                 });
    //             }
    //         });
    //     }
    // });
    //How to alert user of invalid field?
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        new User({
            user_name: req.body.username,
            email: req.body.username,
            password: hash,
        }).save()
        .catch((error) => console.log('Duplicate Entry'));
    });
});
router.post('/login', function(req){

    User.where({User_name: req.body.username}).fetch().then(function(login){
        bcrypt.compare(req.body.password, login.attributes.password, function(err,res){
            if(res){
                console.log("Logged in successfully");
            }
            else{
                console.log("Failed to login");
            }
        })
    })
});


module.exports = router;