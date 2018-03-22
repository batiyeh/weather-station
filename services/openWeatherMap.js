const fetch = require("node-fetch");
const knex = require('knex')(require('../knexfile'));

// Retrieves open weather map data before storing
async function getOpenWeatherData(latitude, longitude){
    var openWeatherData = {};
    openWeatherData["visibility"] = "";
    openWeatherData['wind_speed'] = "";
    openWeatherData['wind_direction'] = "";
    if (latitude !== "n/a" && longitude !== "n/a"){
        var url = "http://api.openweathermap.org/data/2.5/weather?appid=" + process.env.OPEN_WEATHER_KEY + "&lat=" + latitude + "&lon=" + longitude + "&units=imperial";
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message); 

        openWeatherData["visibility"] = body['visibility'];
        openWeatherData['wind_speed'] = body['wind']['speed'];
        openWeatherData['wind_direction'] = body['wind']['deg'];
    }

    return openWeatherData;
}

async function getLatestOpenWeatherData(apikey){
    var latestWeatherData = {};
    latestWeatherData["visibility"] = "";
    latestWeatherData['wind_speed'] = "";
    latestWeatherData['wind_direction'] = "";
    try{
        var weather = await knex('latestweather')
            .join('weather', 'latestweather.weather_id', 'weather.weather_id')
            .join('stations', 'latestweather.apikey', 'stations.apikey')
            .select('weather.*', 'stations.station_name', 'stations.last_connected', 'stations.connected')
            .where('latestweather.apikey', apikey)
    } catch(ex){
        return latestWeatherData;
    }
    latestWeatherData["visibility"] = weather[0]['visibility'];
    latestWeatherData['wind_speed'] = weather[0]['wind_speed'];
    latestWeatherData['wind_direction'] = weather[0]['wind_direction']; 
    return latestWeatherData
}

module.exports =  {
    getOpenWeatherData,
    getLatestOpenWeatherData
}