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
        .catch((error) => res.status(401));//to be handled by react in createComp.js
    });
    return res.status(200);
});

router.post('/login', function(req, res){
    User.where({User_name: req.body.username}).fetch().then(function(login){
        bcrypt.compare(req.body.password, login.attributes.password, function(err,check){
            if(check){
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

router.post('/verify', function(req,res){
    Sessions.where({session_id: req.sessionID}).fetch().then(function(ver){
        if(!ver){
            // console.log('no session');
            return res.status(401);
        }
        else{
            // console.log("session");
            return res.status(200);
        }
    })
})
router.post('/logout', function(req,res){
    Sessions.where({session_id: req.sessionID}).destroy();
    res.redirect('/user/login');
})
module.exports = router;