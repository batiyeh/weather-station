const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const knex = require('./knexfile');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({
        name: 'server-session-cookie-id',
        secret: 'TestSecret',
        saveUninitialized: false,
        resave: false,
        store: new MySQLStore(knex.connection)
    })
);


// Import all of our controllers
var StationController = require('./controllers/StationController');
var UserController = require('./controllers/UserController');
// Route urls to our controllers
app.use('/api/stations', StationController);
app.use('/api/user', UserController);

app.listen(port, () => console.log(`Listening on port ${port}`));