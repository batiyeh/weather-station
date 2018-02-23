const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const knex = require('./knexfile');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);

// Session storage options
const options = {
    checkExpirationInterval: 1000 * 60 * 15, // How frequently expired sessions will be cleared; milliseconds (15 min)
    expiration: 1000 * 60 * 60 * 24 * 7, // The maximum age of a valid session; milliseconds (1 week)
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

const pool = mysql.createPool(knex.connection); // Create connection pool to mysql db
const sessionStore = new MySQLStore(options, pool);

//Express Validator allows us to verify the strings that the user enters during account creation
//Ensuring they meet the requirements for a username/email/password
app.use(expressValidator());

//Creates the Cookie that will be used to store user information and create a session for the user
app.use(cookieParser());
app.use(session({
        name: 'WeatherStation',
        secret: 'c8Ed{H{s',
        saveUninitialized: false,
        resave: false,
        store: sessionStore
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

