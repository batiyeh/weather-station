
'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    //Port 587 is an MSA (message submission agent) port that requires SMTP authentication
    port: 587,
    secure: false,
    auth: {
        //Will implement it with API
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

export default transporter
