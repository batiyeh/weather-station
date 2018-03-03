const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Weather = require('../models/Weather');
const knex = require('knex')(require('../knexfile'));

// Creates a new station via post request
router.post('/', async function (req, res) {
    var result = await new Weather({
        key: req.body.key,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        pressure: req.body.pressure,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }).save()
    return res.json({result});
});

// Returns all stations in the database
router.get('/', async function (req, res) {
    try{
        var weather = await knex('weather').select().orderBy('created_at', 'desc')
    } catch(ex){
        return res.json({});
    }

    return res.json({ weather });
});

// Returns all stations in the database
router.get('/latest', async function (req, res) {
    try{
        var weather = await knex('weather').select('w1.*', 'station_name', 'connected').from('weather as w1').where('w1.created_at', function() {
            this.max('created_at').from('weather as w2').whereRaw('w2.key = w1.key')
        }).leftJoin('stations', 'stations.key', 'w1.key')
    } catch(ex){
        console.log(ex);
        return res.json({});
    }
    return res.json({ weather });
});


module.exports = router;