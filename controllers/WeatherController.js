const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Weather = require('../models/Weather');
const Station = require('../models/Station');
const knex = require('knex')(require('../knexfile'));

// Retrieves open weather map data before storing
getOpenWeatherData = async (latitude, longitude) => {
    var openWeatherData = {};
    openWeatherData["visibility"] = "",
    openWeatherData['wind_speed'] = "",
    openWeatherData['wind_direction'] = ""

    if (latitude !== "n/a" && longitude !== "n/a"){
        var params = {'lat': latitude,
                    'lon': longitude, 
                    'units': 'imperial', 
                    'appid': process.env.OPEN_WEATHER_KEY};
        var url = "http://api.openweathermap.org/data/2.5/weather?" + $.param(params);
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message); 

        openWeatherData["visibility"] = body['visibility'],
        openWeatherData['wind_speed'] = body['wind']['speed'],
        openWeatherData['wind_direction'] = body['wind']['deg']
    }

    return openWeatherData;
}

// Adds weather data to the db via post request
router.post('/', async function (req, res) {
    var station = await Station.where('apikey', req.body.apikey).fetch();
    if (station){
        var openWeatherData = await getOpenWeatherData(req.body.latitude, req.body.longitude);
        if (openWeatherData["visibility"] != "" || openWeatherData['wind_speed'] != "" || openWeatherData['wind_direction'] != ""){
            var result = await new Weather({
                apikey: req.body.apikey,
                created_at: req.body.created_at,
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                pressure: req.body.pressure,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                visibility: openWeatherData["visibility"],
                wind_speed: openWeatherData['wind_speed'],
                wind_direction: openWeatherData['wind_direction']
            }).save()
        }

        else{
            var result = await new Weather({
                apikey: req.body.apikey,
                created_at: req.body.created_at,
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                pressure: req.body.pressure,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
            }).save()
        }
        return res.json({result});
    }

    else{
        res.status(400).send('Invalid API Key.')
    }
});

// Returns all weather data from the database
router.get('/', async function (req, res) {
    try{
        var weather = await knex('weather').select().orderBy('created_at', 'desc')
    } catch(ex){
        return res.json({});
    }

    return res.json({ weather });
});

// Returns the latest weather data for each station from the database
router.get('/latest', async function (req, res) {
    try{
        var weather = await knex('weather').select('w1.*', 'station_name', 'last_connected', 'connected').from('weather as w1').where('w1.created_at', function() {
            this.max('created_at').from('weather as w2').whereRaw('w2.apikey = w1.apikey')
        }).leftJoin('stations', 'stations.apikey', 'w1.apikey')
    } catch(ex){
        console.log(ex);
        return res.json({});
    }
    return res.json({ weather });
});

// Returns the latest weather data for each station from the database
router.post('/verifyKey', async function (req, res) {
    var station = await Station.where('apikey', req.body.apikey).fetch();
    if (station) res.status(200).send("Verified API Key.")
    else res.status(400).send('Invalid API Key.')
});

// Returns the latest weather data for each station from the database
router.post('/offlineData', async function (req, res) {
    req.body.map(async (row) => {
        try{
            var result = await new Weather({
                apikey: row.apikey,
                created_at: row.created_at,
                temperature: row.temperature,
                humidity: row.humidity,
                pressure: row.pressure,
                latitude: row.latitude,
                longitude: row.longitude
            }).save()
        } catch(ex) { 
            console.log(ex); 
        }
    })
    return res.status(400).send('Added historical data.');
});


module.exports = router;