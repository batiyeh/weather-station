

const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'WStationTestdod@gmail.com',
        pass: 'wayne123'
    }

});


let mailOptions = {
    from: 'Weather Station <wstationtestdod@gmail.com>',
    to: 'tmalarkey14@gmail.com',
    subject: 'nodeMailer test',
    text: 'Hello Testing'
};