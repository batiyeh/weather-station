const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const knex = require('./knexfile');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');

app.use(expressValidator());
app.use(cookieParser());
app.use(session({
        name: 'WeatherStationSite',
        secret: 'TestSecret',
        saveUninitialized: false,
        resave: false,
        store: new MySQLStore(knex.connection)
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function (req, res, next){
    res.locals.successMsg = req.flash('Success');
    res.locals.errorMsg = req.flash('Error Msg');
    res.locals.error = req.flash('error');
    next();
});//use these to display message after redirect

// Import all of our controllers
var StationController = require('./controllers/StationController');
var UserController = require('./controllers/UserController');
// Route urls to our controllers
app.use('/api/stations', StationController);
app.use('/api/user', UserController);

app.listen(port, () => console.log(`Listening on port ${port}`));