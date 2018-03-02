const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const async = require('async');
const passport = require('passport');
const nodemailer = require('nodemailer');
const LocalStrategy = require('passport-local').Strategy;

router.post('/create', async function(req, res){
    var username = req.body.username.toLowerCase();
    var email = req.body.email.toLowerCase();
    var username = req.body.username;
    var password = req.body.password;
    var dbUsername = null;
    var dbEmail = null;
    //Checks if Username and Email already exist in the database
    var user = await User.where({user_name: username}).fetch()
    if(user)
        dbUsername = user.attributes.user_name.toLowerCase();

    var em = await User.where({email: email}).fetch()
    if(em)
        dbEmail = em.attributes.email.toLowerCase();
    
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
        var user = await User.where({user_name: username}).fetch()
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
router.post('/getUserInfo', async function(req,res){
    console.log('getting user info');
    if(req.user){
        var user = await User.where({user_name: req.user}).fetch();

        res.json({username: user.attributes.user_name, email: user.attributes.email,
        phone: user.attributes.phone, isAdmin: user.attributes.isAdmin});
    }
    else{
        res.json({username: undefined})
    }
})

router.post('/logout', function(req,res){
    req.session.destroy(response => {
        res.json({response: response})
    });
})

router.post('/reset/', function(req,res){
    var email = req.body.email;
    //This waterfall will generate a token in the first function
    //Assign that token to a user in the second function
    //and email it to the user in the 3rd function
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
                    //Find better way to store user and pass for whole system.
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
            //makes sure new user password meets password requirements
            req.checkBody('password','Password must be longer than 8 characters, cannot contain symbols, and must have at least 1 letter and 1 number.')
            .isLength({min: 8}).matches(/\d/).not().matches(/\W/).equals(req.body.password2);
            //if it doesnt meet requirements, throw error
            var errors = req.validationErrors();
            if(errors){
                console.log(errors);
            }
            else{
                //hash password, assign to user in db
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

router.post('/editProfile', async function(req, res){
    var email = req.body.email;
    var phone = req.body.phone;
    var user = await User.where({user_name: req.user}).fetch()
    
    if(email){
        var dbEmail = "";
        email = await email.toLowerCase();

        var newUser = await User.where({email: email}).fetch();
        if(newUser){
            dbEmail = newUser.attributes.email.toLowerCase();
        }
        //checks that their email is valid and not a duplicate
        req.checkBody('email', 'Invalid email').notEmpty().isEmail().not().equals(dbEmail);
    }
    else{
        email = user.attributes.email;
    }
    if(phone){
        var dbPhone = ""
        //remove all non-digit characters
        phone = phone.replace(/\D/g, '');

        var newUser = await User.where({phone: phone}).fetch();
        if(newUser){
            dbPhone = newUser.attributes.phone;
        }
        //must enter a 10 digit number, no duplicate phone numbers
        req.checkBody('phone', 'Invalid Phone').isLength({min: 10, max:10}).not().equals(dbPhone);
    }
    else{
        phone = user.attributes.phone;
    }
    //checks that the email/phone the user entered didnt return errors
    var errors = req.validationErrors();
    if(errors){
        console.log(errors);
    }
    else{
        //updates user profile
        await User.where({user_name: req.user}).save({
            email: email,
            phone: phone,
        },{patch:true});
    }

    res.redirect('/profile');
})
router.post('/editPassword', async function(req, res){
    var currPass = req.body.currPass;
    var newPass = req.body.newPass;

    var user = await User.where({user_name: req.user}).fetch()
    if(!user)
        console.log('Invalid username');//(this shouldnt happen ever)

    var check = await bcrypt.compare(currPass, user.attributes.password);
    if(!check){
        console.log('Current Password is incorrect')
    }
    else{

        req.checkBody('newPass','Password must be longer than 8 characters, cannot contain symbols, and must have at least 1 letter and 1 number.')
        .isLength({min: 8}).matches(/\d/).not().matches(/\W/);

        var errors = req.validationErrors();
        if(errors){
            console.log(errors);
        }
        else{
            //updates user password in db
            await bcrypt.hash(newPass, 10, function(err,hash){
                User.where({user_name: req.user}).save({
                    password: hash,
                },{patch:true})
            })
            res.redirect('/profile');
        }
    }
})
module.exports = router;