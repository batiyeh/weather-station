const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;

// Import all of our controllers
var StationController = require('./controllers/StationController');

// Route urls to our controllers
app.use('/api/stations', StationController);

app.listen(port, () => console.log(`Listening on port ${port}`));

//email smtp
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'WStationTestdod@gmail.com',
        pass: 'wayne123'
    }
});