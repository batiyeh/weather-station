const fetch = require("node-fetch");

// Retrieves open weather map data before storing
async function getOpenWeatherData(latitude, longitude){
    var openWeatherData = {};
    openWeatherData["visibility"] = "",
    openWeatherData['wind_speed'] = "",
    openWeatherData['wind_direction'] = ""
    if (latitude !== "n/a" && longitude !== "n/a"){
        var url = "http://api.openweathermap.org/data/2.5/weather?appid=" + process.env.OPEN_WEATHER_KEY + "&lat=" + latitude + "&lon=" + longitude + "&units=imperial";
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message); 

        openWeatherData["visibility"] = body['visibility'],
        openWeatherData['wind_speed'] = body['wind']['speed'],
        openWeatherData['wind_direction'] = body['wind']['deg']
    }

    return openWeatherData;
}

module.exports =  {
    getOpenWeatherData
}