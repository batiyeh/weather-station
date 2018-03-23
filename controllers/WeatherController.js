const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Weather = require('../models/Weather');
const LatestWeather = require('../models/LatestWeather');
const Station = require('../models/Station');
const knex = require('knex')(require('../knexfile'));
const openweather = require('../services/openWeatherMap');
const _ = require('lodash');
var moment = require('moment');
moment().format();

// Adds weather data to the db via post request
// This is probably super slow but it makes it more efficient for the user on the stations page for now
// TODO: Think of a more efficient way to structure our db
router.post('/', async function (req, res) {
    var station = await Station.where('apikey', req.body.apikey).fetch();
    if (station){
        var latestWeather = await openweather.getLatestOpenWeatherData(req.body.apikey);

        // Get Open Weather Maps data every minute or if the latest weather does not have any owm data
        if ((req.body.data_index % 12 == 0 || req.body.data_index == 0) ||
        (_.isUndefined(latestWeather.visibility) || _.isNull(latestWeather.visibility))){
            var openWeatherData = await openweather.getOpenWeatherData(req.body.latitude, req.body.longitude);
        } else{
            var openWeatherData = latestWeather;
        }

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

        // Store our resulting row in latest weather so we can quickly get the latest weather
        // for our main page
        if (result.id){
            var latest = await LatestWeather.where('apikey', req.body.apikey).fetch();
            if (latest){
                var result = await LatestWeather.where('apikey', req.body.apikey).save({
                    weather_id: result.id,
                    apikey: req.body.apikey,
                }, {patch:true});
            }

            else{
                var result = await new LatestWeather({
                    weather_id: result.id,
                    apikey: req.body.apikey,
                }).save()
            }
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
        var weather = await knex('latestweather')
            .join('weather', 'latestweather.weather_id', 'weather.weather_id')
            .join('stations', 'latestweather.apikey', 'stations.apikey')
            .select('weather.*', 'stations.station_name', 'stations.last_connected', 'stations.connected')
    } catch(ex){
        console.log(ex);
        return res.json({});
    }
    return res.json({ weather });
});

// Returns the temperature for the last 24 from each station from the database
router.get('/temp/:from/:to', async function (req, res) {
    try{
        var temp = await knex('weather').select('weather.temperature','weather.created_at', 'weather.apikey', 'stations.station_name').from('weather')
        .leftJoin('stations', 'stations.apikey', 'weather.apikey')
        .whereBetween('weather.created_at', [req.params.from, req.params.to]);
    } catch(ex){
        console.log(ex);
        return res.json({});
    }
    return res.json({ temp });
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