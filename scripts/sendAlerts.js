const knex = require('knex')(require('../knexfile'))
const nodemailer = require('nodemailer');
const Alerts = require('../models/Alerts');
const WebpageAlerts = require('../models/WebpageAlerts');
const moment = require('moment');
moment().format();

getAlerts = async () =>{
    //Gets all alerts currently in database and the user's email address/phone
    var alerts = await knex('alerts')
    .select('alerts.alert_id', 'alerts.station_name', 'alerts.type', 'alerts.keyword' ,'alerts.threshold' , 'alerts.last_triggered', 'alertvalues.value', 
    'alertmethods.method', 'alerts.username', 'users.email', 'users.phone')
    .leftJoin('alertvalues', 'alerts.alert_id', '=', 'alertvalues.alert_id')
    .leftJoin('alertmethods', 'alerts.alert_id', '=', 'alertmethods.alert_id')
    .leftJoin('users', 'alerts.username', '=', 'users.username')
    return alerts;
}
getWeather = async () => {
    //gets the most recent weather data from each station
    var weather = await knex('latestweather')
    .join('weather', 'latestweather.weather_id', 'weather.weather_id')
    .join('stations', 'latestweather.apikey', 'stations.apikey')
    .select('weather.*', 'stations.station_name', 'stations.last_connected', 'stations.connected')
    return weather;
}
sendAlerts = async () => {
    var triggered = []
    var alerts = await getAlerts();
    var weather = await getWeather();

    //Checks each alert to see if it has been triggered
    //Triggered alerts are added to an array
    var nextIndex = null;
    var value1 = null;
    var value2 = null;
    alerts.map((alerts, index) =>{
        weather.map(weather => {
            if(alerts.keyword === 'above'){
                if((weather[alerts.type] > alerts.value) && (weather.station_name === alerts.station_name)){
                    triggered.push(alerts);
                }
            }
            else if((alerts.keyword === 'between') && (weather.station_name === alerts.station_name)){
                if(nextIndex != index){
                    value1 = alerts.value;
                    nextIndex = index + 1;
                }
                else{
                    value2 = alerts.value;
                    alerts.firstValue = value1;
                    triggered.push(alerts);
                }
            }
            else if((alerts.keyword === 'below')  && (weather.station_name === alerts.station_name)){
                if(weather[alerts.type] < alerts.value){
                    triggered.push(alerts);
                }
            }
        })
    })

    //checks if any alerts in the triggered array have been triggered recently
    //if the time is greater than the threshold, they are added to array newTrig
    var newTrig = [];
    triggered.map(triggered =>{
        if(triggered.threshold === '1 hour'){
            if((1000 * 60 * 60) < (moment.utc() - triggered.last_triggered)){
                newTrig.push(triggered);
            }
        }
        else if(triggered.threshold === '12 hours'){
            if((1000 * 60 * 60 * 12) < (moment.utc() - triggered.last_triggered)){
                newTrig.push(triggered);
            }
        }
        else if(triggered.threshold === '24 hours'){
            if((1000 * 60 * 60 * 24) < (moment.utc() - triggered.last_triggered)){
                newTrig.push(triggered);
            }
        }
    })
    //triggered array changed to new values
    triggered = newTrig;

    //last_triggered value updated to current time on all triggered alerts
    triggered.map(triggered =>{
        Alerts.where({alert_id: triggered.alert_id}).save({
            last_triggered: knex.fn.now()
        },{patch:true})
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
    if(triggered.firstValue){
        var mailOptions = {
            to: triggered.email,
            from: 'wstationtestdod@gmail.com',
            subject: 'Inclement weather alert!',
            text: 'You are receiving this message because the following alert was triggered:\n\n'+
            'The ' + triggered.type + ' is ' + triggered.keyword + ' ' + triggered.firstValue + ' and ' + triggered.value + ' at station: ' + triggered.station_name + '\n\n'+
            'The current weather at ' + triggered.station_name + ' is: \n\n'+
            'Temperature: ' + triggeredStation.temperature + '\n' +
            'Pressure: ' + triggeredStation.pressure + '\n' +
            'Humidity: ' + triggeredStation.humidity + '\n'
            
        };
    }
    else{
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
    }

    transporter.sendMail(mailOptions,function(err){
        //Alert user email has been sent
        done(err, 'done');
    });
}
sendSMS = async (triggered, weather) => {

}
sendWebpage = async (triggered, weather) => {
    var triggeredStation = null;
    weather.map(weather=>{
        if(weather.station_name === triggered.station_name){
            triggeredStation = weather;
        }
    })

    await new WebpageAlerts({
        read: false,
        temperature: triggeredStation.temperature,
        pressure: triggeredStation.pressure,
        humidity: triggeredStation.humidity,
        alert_id: triggered.alert_id
    }).save()
}
sendAlerts();

module.exports =  {
    sendAlerts
}