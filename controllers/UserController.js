var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const async = require('async');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.post('/create', async function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var dbUsername = null;
    var dbEmail = null;
    
    //Checks if Username and Email already exist in the database
    var user = await User.where({user_name: username}).fetch()
    if(user)
        dbUsername = u.attributes.user_name.toLowerCase();

    var em = await User.where({email: email}).fetch()
    if(em)
        dbEmail = u.attributes.email.toLowerCase();
    
    //Verifies that all User Account credentials meet the string requirements
    req.checkBody('username','Invalid username').notEmpty().matches(/\w/).not().equals(dbUsername);
    req.checkBody('email', 'Invalid email').notEmpty().isEmail().not().equals(dbEmail);
    req.checkBody('password','Password must be longer than 8 characters, cannot contain symbols, and must have at least 1 letter and 1 number.')
    .isLength({min: 8}).matches(/\d/).not().matches(/\W/);
    
    //If one of the user inputs fails to meet the requirements it gets saved in errors
    var errors = req.validationErrors();

    if(errors){
        //add a way to display errors on frontend
    }
    else{
        //hashes the password using bcrypt, then creates user and stores in database
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
//writes username into cookie
passport.serializeUser(function(user, done){
    done(null, user.attributes.user_name);
});
//erases username from cookie
passport.deserializeUser(async function(username, done){
    var user = await User.where({user_name: username}).fetch()
        if(user)
            done(null, user.attributes.user_name);
});
//Verifies user login credentials
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
//calls passport authentication on login
router.post('/login', passport.authenticate('local', {failureRedirect:'/user/login'}), 
function(req, res){
    res.redirect('/stations');
});
//used to verify user is logged in on each page
router.post('/verifyLoggedIn', function(req,res){
    //returns username from cookie
    res.json({user: req.user});
})

router.post('/logout', function(req,res){
    //Add logout function here
    //req.logout() maybe?
    res.redirect('/user/login');
})

router.post('/reset', function(req,res){
    var email = req.body.email;
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                var token = buf.toString('hex');
                done(err,token); 
            });
        },
        async function(token, done){
            console.log(email);
            date = Date.now() + 3600000;
            var user = await User.where({email: email}).save({
                reset_password_token: token,
                // reset_password_expires: date,
            },{method:'insert',patch:true});
            console.log(user);
        }
    ])

    //res.redirect('/user/login');
})
module.exports = router;