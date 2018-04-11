const knex = require('knex')(require('../knexfile'));
const fetch = require("node-fetch");
const moment = require('moment');

// If the station has not sent data for longer than 30 seconds we will 
// Update the connected column to be false.
async function checkConnected(){
    var stations = await knex('latestweather')
            .join('weather', 'latestweather.weather_id', 'weather.weather_id')
            .join('stations', 'latestweather.apikey', 'stations.apikey')
            .select('weather.created_at', 'stations.apikey', 'stations.connected');
    
    for (var i = 0; i < stations.length; i++){
        var station = stations[i];
        if (((moment() - moment(station["created_at"]).utc(station["created_at"]).local()) > 20000) && station["connected"] === 1){
            var result = await knex('stations').where({apikey: station.apikey}).update({
                connected: 0,
            });
        }
    }
}

module.exports =  {
    checkConnected
}
