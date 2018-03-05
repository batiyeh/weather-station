const knex = require('knex')(require('../knexfile'))
const nodemailer = require('nodemailer');

getAlerts = async () =>{
    //Gets all alerts currently in database and the user's email address/phone
    var alerts = await knex('alerts')
    .select('alerts.alert_id', 'alerts.station_name', 'alerts.type', 'alerts.keyword', 'alerts.last_triggered', 'alertvalues.value', 
    'alertmethods.method', 'alerts.username', 'users.email', 'users.phone')
    .leftJoin('alertvalues', 'alerts.alert_id', '=', 'alertvalues.alert_id')
    .leftJoin('alertmethods', 'alerts.alert_id', '=', 'alertmethods.alert_id')
    .leftJoin('users', 'alerts.username', '=', 'users.username')
    return alerts;
}
getWeather = async () => {
    //gets the most recent weather data from each station
    var weather = await knex('weather').select('w1.*', 'station_name', 'last_connected', 'connected').from('weather as w1').where('w1.created_at', function() {
        this.max('created_at').from('weather as w2').whereRaw('w2.apikey = w1.apikey')
    }).leftJoin('stations', 'stations.apikey', 'w1.apikey').orderBy('w1.created_at', 'desc')

    return weather;
}
comparison = async () => {
    var triggered = []
    var alerts = await getAlerts();
    var weather = await getWeather();

    //Checks each alert to see if it has been triggered
    //Triggered alerts are added to an array
    alerts.map(alerts =>{
        weather.map(weather =>{
            if(alerts.keyword === 'above'){
                if(weather[alerts.type] > alerts.value){
                    triggered.push(alerts);
                }
            }
            else if(alerts.keyword === 'between'){
                
            }
            else if(alerts.keyword === 'below'){
                if(weather[alerts.type] > alerts.value){
                    triggered.push(alerts);
                }
            }
        })
    })
    //Checks the alert method on each triggered alert and calls the corresponding function
    triggered.map(triggered =>{
        if(triggered.method === 'email'){
            sendEmail(triggered, weather);
        }
        else if(triggered.method === 'sms'){
            sendSMS(triggered, weather);
        }
        else if(triggered.method === 'webpage'){
            sendWebpage(triggered, weather);
        }
    })
}
//Sends the user an email for the triggered alert
//Email includes the alert that was triggered and
//the weather data at that station when it was triggered
sendEmail = async (triggered, weather) =>{
    var triggeredStation = null;
    weather.map(weather=>{
        if(weather.station_name === triggered.station_name){
            triggeredStation = weather;
        }
    })

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
        to: triggered.email,
        from: 'wstationtestdod@gmail.com',
        subject: 'Inclement weather alert!',
        text: 'You are receiving this message because the following alert was triggered:\n\n'+
        'The ' + triggered.type + ' is ' + triggered.keyword + ' ' + triggered.value + ' at station: ' + triggered.station_name + '\n\n'+
        'The current weather at ' + triggered.station_name + ' is: \n\n'+
        'Temperature: ' + triggeredStation.temperature + '\n' +
        'Pressure: ' + triggeredStation.pressure + '\n' +
        'Humidity: ' + triggeredStation.humidity + '\n'
        
    };
    transporter.sendMail(mailOptions,function(err){
        //Alert user email has been sent
        done(err, 'done');
    });
}
sendSMS = async (triggered, weather) => {

}
sendWebpage = async (triggered, weather) => {

}

comparison();