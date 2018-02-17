var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');
var Sessions = require('../models/Sessions');
const bcrypt = require('bcrypt');

router.post('/create', function(req, res){
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        new User({
            user_name: req.body.username,
            email: req.body.email,
            password: hash,
        }).save()
        .catch((error) => console.log('Duplicate Entry'));//to be handled by react in createComp.js
    });
});

router.post('/login', function(req, res){
    User.where({User_name: req.body.username}).fetch().then(function(login){
        bcrypt.compare(req.body.password, login.attributes.password, function(err,check){
            if(check){
                console.log('in login')
                req.session.username = req.body.username;
                req.session.success = true;
                req.session.save();
                res.redirect('/map');
            }
            else{
                console.log("Incorrect username/password");
            }
        })
    })
});

router.get('/verify', function(req,res){
    Sessions.where({session_id: req.sessionID}).fetch().then(function(ver){
        if(!ver){
            console.log('no session');
            var data = false;
            res.redirect('/user/login');
            //return res.status(401).send({data});
        }
        else{
            console.log("session");
            return res.status(200);
        }
    })
})
module.exports = router;