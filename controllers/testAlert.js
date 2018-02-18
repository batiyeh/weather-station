
'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'WStationTestdod@gmail.com',
        pass: 'wayne123'
    }

});


const message = {
    from: 'wstationtestdod@gmail.com',
    to: 'tmalarkey14@gmail.com',
    subject: 'Weather Alert!',
    text: 'Hello Testing'
};


transporter.sendMail(message, (error, info) => {
    if (error) {
        return console.log(error);
    }
});

//export default transporter
