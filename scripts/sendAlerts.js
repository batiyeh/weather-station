const knex = require('knex')(require('../knexfile'))
const nodemailer = require('nodemailer');
const Alerts = require('../models/Alerts');
const TriggeredAlerts = require('../models/TriggeredAlerts');

const moment = require('moment');
moment().format();

getAlerts = async () =>{
    //Gets all alerts currently in database and the user's email address/phone
    var alerts = await knex('alerts')
    .select('alerts.alert_id', 'stations.station_name', 'alerts.type', 'alerts.keyword' ,'alerts.threshold' , 'alerts.last_triggered', 'alertvalues.value', 
    'alertmethods.method', 'alerts.username', 'users.email', 'users.phone')
    .leftJoin('alertvalues', 'alerts.alert_id', '=', 'alertvalues.alert_id')
    .leftJoin('alertmethods', 'alerts.alert_id', '=', 'alertmethods.alert_id')
    .leftJoin('users', 'alerts.username', '=', 'users.username')
    .leftJoin('stations', 'stations.apikey', '=','alerts.apikey')

    .where('alerts.deleted', '=', false)
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

    var id = null;
    var method = null;

    alerts.map(map =>{
        if(map.keyword === 'between'){
            id = map.alert_id;
            method = map.method;
            alerts.map(map2 =>{
                if((map2.alert_id === id) && (map2.method === method) && (map2.value > map.value)){
                    map.secondValue = map2.value;
                    triggered.push(map);
                }
            })
        }
        else{
            triggered.push(map)
        }
    })

    //Checks each alert to see if it has been triggered
    //Triggered alerts are added to an array
    var newTrig = []
    var nextIndex = null;
    var value1 = null;
    triggered.map((triggered, index) =>{
        weather.map(weather => {
            if(triggered.keyword === 'above'){
                if((weather[triggered.type] > triggered.value) && (weather.station_name === triggered.station_name)){
                    newTrig.push(triggered);
                }
            }
            else if((triggered.keyword === 'between') && (weather.station_name === triggered.station_name)){
                if((weather[triggered.type] > triggered.value) && (weather[triggered.type] < triggered.secondValue) && (weather.station_name === triggered.station_name)){
                    newTrig.push(triggered);
                }
            }
            else if((triggered.keyword === 'below')  && (weather.station_name === triggered.station_name)){
                if(weather[triggered.type] < triggered.value){
                    newTrig.push(triggered);
                }
            }
        })
    })
    triggered = newTrig;

    // checks if any alerts in the triggered array have been triggered recently
    // if the time is greater than the threshold, they are added to array newTrig
    // newTrig = [];
    // triggered.map(triggered =>{
    //     if(triggered.threshold === '1 hour'){
    //         if((1000 * 60 * 60) < (moment.utc() - triggered.last_triggered)){
    //             newTrig.push(triggered);
    //         }
    //     }
    //     else if(triggered.threshold === '12 hours'){
    //         if((1000 * 60 * 60 * 12) < (moment.utc() - triggered.last_triggered)){
    //             newTrig.push(triggered);
    //         }
    //     }
    //     else if(triggered.threshold === '24 hours'){
    //         if((1000 * 60 * 60 * 24) < (moment.utc() - triggered.last_triggered)){
    //             newTrig.push(triggered);
    //         }
    //     }
    // })
    // //triggered array changed to new values
    // triggered = newTrig;

    //last_triggered value updated to current time on all triggered alerts
    triggered.map(triggered =>{
        Alerts.where({alert_id: triggered.alert_id}).save({
            last_triggered: knex.fn.now()
        },{patch:true})
    })

    //Checks the alert method on each triggered alert and calls the corresponding function
    triggered.map(triggered =>{
        weather.map(station=>{
            if(station.station_name === triggered.station_name){
                if(triggered.method === 'email'){
                    sendEmail(triggered, station);
                }
                else if(triggered.method === 'sms'){
                    sendSMS(triggered, station);
                }
                else if(triggered.method === 'webpage'){
                    sendWebpage(triggered, station);
                }
            }
        })
    })
}
//Sends the user an email for the triggered alert
//Email includes the alert that was triggered and
//the weather data at that station when it was triggered
sendEmail = async (triggered, station) =>{

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
    if(triggered.secondValue){
        var mailOptions = {
            to: triggered.email,
            from: 'wstationtestdod@gmail.com',
            subject: 'Inclement weather alert!',
            text: 'You are receiving this message because the following alert was triggered:\n\n'+
            'The ' + triggered.type + ' is ' + triggered.keyword + ' ' + triggered.value + ' and ' + triggered.secondValue + ' at station: ' + triggered.station_name + '\n\n'+
            'The current weather at ' + triggered.station_name + ' is: \n\n'+
            'Temperature: ' + station.temperature + '\n' +
            'Pressure: ' + station.pressure + '\n' +
            'Humidity: ' + station.humidity + '\n'
            
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
            'Temperature: ' + station.temperature + '\n' +
            'Pressure: ' + station.pressure + '\n' +
            'Humidity: ' + station.humidity + '\n'
            
        };
    }

    transporter.sendMail(mailOptions,function(err){
        //Alert user email has been sent
        done(err, 'done');
    });

    new TriggeredAlerts({
        method: 'email',
        temperature: station.temperature,
        pressure: station.pressure,
        humidity: station.humidity,
        alert_id: triggered.alert_id,
    }).save()
}
sendSMS = async (triggered, station) => {

    new TriggeredAlerts({
        method: 'sms',
        temperature: station.temperature,
        pressure: station.pressure,
        humidity: station.humidity,
        alert_id: triggered.alert_id,
    }).save()


}
sendWebpage = async (triggered, station) => {

    new TriggeredAlerts({
        method: 'webpage',
        read: false,
        temperature: station.temperature,
        pressure: station.pressure,
        humidity: station.humidity,
        alert_id: triggered.alert_id,
        cleared: false
    }).save()
}

module.exports =  {
    sendAlerts
}