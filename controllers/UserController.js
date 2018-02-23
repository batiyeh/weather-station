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
const nodemailer = require('nodemailer');
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
        res.redirect('/');
});

//used to verify user is logged in on each page
router.post('/verifyLoggedIn', function(req,res){
    //returns username from cookie
    res.json({user: req.user});
})

router.post('/logout', function(req,res){
    req.session.destroy(response => {
        res.redirect('/user/login');
    });
})

router.post('/reset/', function(req,res){
    var email = req.body.email;
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                var token = buf.toString('hex');
                done(err,token); 
            });
        },
        function(token, done){
            date = Date.now() + 3600000;
            var user = User.where({email: email}).save({
                reset_password_token: token,
                // reset_password_expires: date,
            },{patch:true});   
            if(!user)
                var err = 'No user';
            done(err, token, user);
        },
        function(token, user, done){
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'WStationTestdod@gmail.com',
                    pass: 'wayne123'
                }
            });
            var mailOptions = {
                to: email,
                from: 'wstationtestdod@gmail.com',
                subject: 'Weather Station Account Password Recovery',
                text: 'You are receiving this message because you have initiated the password reset process.\n\n'+
                'Please click the following link to complete this process:\n\n'+
                'localhost:8000/user/reset/' + token + '\n\n' +
                'If you did not request a password reset, please ignore this email.\n'
            };
            transporter.sendMail(mailOptions,function(err){
                //Alert user email has been sent
                done(err, 'done');
            });
        }
    ],function(err){
        if(err)
            console.log('Error:', err);
    })
    res.redirect('/user/login');
})

router.post('/reset/:token', function(req, res){
    async.waterfall([ 
        function(done){

            req.checkBody('password','Password must be longer than 8 characters, cannot contain symbols, and must have at least 1 letter and 1 number.')
            .isLength({min: 8}).matches(/\d/).not().matches(/\W/).equals(req.body.password2);

            var errors = req.validationErrors();
            if(errors){
                console.log(errors);
            }
            else{
                bcrypt.hash(req.body.password, 10, function(err,hash){
                    var user = User.where({reset_password_token: req.params.token}).save({
                        password: hash,
                        reset_password_token: null
                    },{patch:true})
                    if(!user)
                        console.log("Error no user with that token");//redirect after
                })
                console.log("Your password has been reset!");
                res.redirect('/user/login');
            }
        }
    ])
})

module.exports = router;