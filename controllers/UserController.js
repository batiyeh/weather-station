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
    
    var user = await User.where({user_name: username}).fetch()
    if(user)
        dbUsername = u.attributes.user_name.toLowerCase();

    var em = await User.where({email: email}).fetch()
    if(em)
        dbEmail = u.attributes.email.toLowerCase();
    //query db to make sure there aren't duplicate email/username
    
    req.checkBody('username','Invalid username').notEmpty().matches(/\w/).not().equals(dbUsername);
    req.checkBody('email', 'Invalid email').notEmpty().isEmail().not().equals(dbEmail);
    req.checkBody('password','Password must be longer than 8 characters, cannot contain symbols, and must have at least 1 letter and 1 number.')
    .isLength({min: 8}).matches(/\d/).not().matches(/\W/);
    //Verifies that all User Account credentials meet the string requirements

    var errors = req.validationErrors();
    //If one of the user inputs fails to meet the requirements it gets saved in errors

    if(errors){
        //display errors on front end somehow
        console.log(errors);
    }
    else{
        await bcrypt.hash(password, 10, function(err, hash) {
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
    console.log('serialized');
    done(null, user.attributes.user_name);
});

passport.deserializeUser(async function(username, done){
    console.log('deserialized');
    var user = await User.where({user_name: username}).fetch()
        if(user)
            done(null, user.attributes.user_name);
});

passport.use(new LocalStrategy(
    async function(username, password, done) {
        var user = await User.where({User_name: username}).fetch()
            if(!user)
                return done(null, false, {message: 'Invalid username/password'});
            
        var check = await bcrypt.compare(password, user.attributes.password);
            if(check)
                return done(null, user);
            
        return done(null, false, {message: 'Invalid username/password'});
    }
));

router.post('/login', passport.authenticate('local', {failureRedirect:'/user/login'}), 
function(req, res){
    req.session.user = req.body.username;
    req.session.save();
    console.log(req.session);
    res.redirect('/map');
});

router.post('/auth', function(req,res){
    console.log(req.session);

    return true;
})

router.post('/logout', function(req,res){
    Sessions.where({session_id: req.sessionID}).destroy();
    res.redirect('/user/login');
})
module.exports = router;