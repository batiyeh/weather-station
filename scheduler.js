const schedule = require('node-schedule');
const sendAlerts = require('./scripts/sendAlerts');
const saveToWeather = require('./scripts/saveWeather');
const checkConnected = require('./scripts/checkConnected');

module.exports =  {
    // Called every 0, 15, 30, and 45th minute to transfer data
    // from stations table to weather table
    saveHistoricalData() {
        schedule.scheduleJob('0 * * * *', function(){
            saveToWeather.saveToWeather();
        })

        schedule.scheduleJob('15 * * * *', function(){
            saveToWeather.saveToWeather();
        })

        schedule.scheduleJob('30 * * * *', function(){
            saveToWeather.saveToWeather();
        })

        schedule.scheduleJob('45 * * * *', function(){
            saveToWeather.saveToWeather();
        })
    },

    // Called every 30 seconds to check if any "connected" stations
    // are no longer sending data
    updateConnectedList() {
        schedule.scheduleJob('0 * * * * *', function(){
            checkConnected.checkConnected();
        }) 

        schedule.scheduleJob('15 * * * * *', function(){
            checkConnected.checkConnected();
        })

        schedule.scheduleJob('30 * * * * *', function(){
            checkConnected.checkConnected();
        })

        schedule.scheduleJob('45 * * * * *', function(){
            checkConnected.checkConnected();
        })
    },
    //checks all user alerts every minute
    checkAlerts(){
        schedule.scheduleJob('0 * * * * *', function(){
            sendAlerts.sendAlerts();
        })
    }
}

