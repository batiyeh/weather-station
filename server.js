const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const knex = require('./knexfile');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('passport');

//Express Validator allows us to verify the strings that the user enters during account creation
//Ensureing they meet the requirements for a username/email/password
app.use(expressValidator());

//Creates the Cookie that will be used to store user information and create a session for the user
app.use(cookieParser());
app.use(session({
        name: 'WeatherStationSite',
        secret: 'TestSecret',
        saveUninitialized: false,
        resave: false,
    })
);

//Facilitates logging in and creating sessions
app.use(passport.initialize());
app.use(passport.session());

// Import all of our controllers
var StationController = require('./controllers/StationController');
var UserController = require('./controllers/UserController');
// Route urls to our controllers
app.use('/api/stations', StationController);
app.use('/api/user', UserController);

app.listen(port, () => console.log(`Listening on port ${port}`));

