var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');
var Sessions = require('../models/Sessions');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.post('/create', async function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var dbUsername = null;
    var dbEmail = null;
    
    await User.where({user_name: username}).fetch().then(function(u){
        if(u){
            dbUsername = u.attributes.user_name.toLowerCase();
        }
    })
    await User.where({email: email}).fetch().then(function(u){
        if(u){
            dbEmail = u.attributes.email.toLowerCase();
        }
    })
    
    req.checkBody('username','Invalid username').notEmpty().matches(/\w/).not().equals(dbUsername);
    req.checkBody('email', 'Invalid email').notEmpty().isEmail().not().equals(dbEmail);
    req.checkBody('password','Password must be longer than 8 characters, cannot contain symbols, and must have at least 1 letter and 1 number.')
    .isLength({min: 8}).matches(/\d/).not().matches(/\W/);

    var errors = req.validationErrors();

    if(errors){
        //display errors on front end somehow
        console.log(errors);
    }
    else{
        bcrypt.hash(password, 10, function(err, hash) {
            new User({
                user_name: username,
                email: email,
                password: hash,
            }).save()
        });
        
        res.redirect('/user/login')
    }
});
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.where({user_id: id}).fetch().then(function(user){
        done(user.attributes.username);
    })
});
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.where({User_name: username}).fetch().then(function(user){
            if(!user){
                return done(null, false, {message: 'Invalid username/password'});
            }
            else{
                bcrypt.compare(password, user.attributes.password, function(check){
                    if(check){
                        return done(null, true)
                    }
                    else{
                        return done(null, false, {message: 'Invalid username/password'});
                    }
                })
            }
        })
    }
));
router.post('/login', passport.authenticate('local', {successRedirect:'/map', failureRedirect:'/stations', failureFlash: true}), 
function(req, res){
    res.redirect('/map');
    // var username = req.body.username;
    // var password = req.body.password;

    // User.where({User_name: username}).fetch().then(function(login){
    //     bcrypt.compare(password, login.attributes.password, function(err,check){
    //         if(check){
    //             req.session.username = username;
    //             req.session.success = true;
    //             req.session.save();
    //             res.redirect('/map');
    //         }
    //         else{
    //             console.log("Incorrect username/password");
    //         }
    //     })
    // })
});

router.post('/verify', function(req,res){
    Sessions.where({session_id: req.sessionID}).fetch().then(function(ver){
        if(!ver){
            console.log('no session');
            return res.status(401);
        }
        else{
            console.log("session");
            return res.status(200);
        }
    })
})
router.post('/logout', function(req,res){
    Sessions.where({session_id: req.sessionID}).destroy();
    res.redirect('/user/login');
})
module.exports = router;