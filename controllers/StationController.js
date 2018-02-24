var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Station = require('../models/Station');
var StationNames = require('../models/StationNames');
var knex = require('knex')(require('../knexfile'))

// Creates a new station via post request
router.post('/', async function (req, res) {
    // Checks if the MAC address already exists in the table. If it does,
    // we update the row. If not, we create a new row.
    var station = await Station.where('mac_address', req.body.mac_address).fetch();
    // If the station already exists, update it.
    // TODO: There might be a better way to update where we don't have to select again
    if (station){
        var result = await Station.where('mac_address', req.body.mac_address).save({
            updated_at: req.body.updated_at,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            pressure: req.body.pressure,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            connected: req.body.connected
        }, {patch:true});
    }

    // If the station doesn't exist, create a new one and insert it.
    else {
        // Save can both insert a new model and update an existing one
        // with the 'patch' attribute
        var result = await new Station({
            mac_address: req.body.mac_address,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            pressure: req.body.pressure,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            connected: req.body.connected
        }).save()
    }
    return res.json({result});
});

// Returns all stations in the database
router.get('/', async function (req, res) {
    try{
        var stations = await knex('stations')
        .leftJoin('station_names', 'stations.mac_address', '=', 'station_names.mac_address')
        .select('stations.mac_address', 'stations.created_at', 'stations.updated_at', 'stations.temperature', 'stations.humidity', 'stations.pressure', 'stations.latitude', 'stations.longitude', 'stations.connected', 'station_names.name')
    } catch(ex){
        return res.json({});
    }

    return res.json({ stations });
});

// Returns a single station by ID and either updates or deletes it depending on request params
router.route('/:id')
    // Update existing station 
    .put(async function(req, res){
        var result = await Station.where('station_id', req.params.station_id).save({
            mac_address: req.body.mac_address,
            updated_at: req.body.updated_at,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            pressure: req.body.pressure,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            connected: req.body.connected
        });
        return res.json({result});
    })
    // Delete existing station
    .delete(async function(req, res) {
        var result = await Station.where('station_id', req.params.station_id).destroy();
        res.json({result});
    });

// Endpoint to add or update a station name 
router.post('/name', async function (req, res) {
    // Checks if the MAC address already exists in the table. If it does,
    // we update the row. If not, we create a new row.
    var name = await StationNames.where('mac_address', req.body.mac_address).fetch();
    // If the name already exists, update it.
    // TODO: There might be a better way to update where we don't have to select again
    if (name){
        var result = await StationNames.where('mac_address', req.body.mac_address).save({
            name: req.body.name
        }, {patch:true});
    }

    // If the name doesn't exist, create a new one and insert it.
    else {
        var result = await new StationNames({
            mac_address: req.body.mac_address,
            name: req.body.name
        }).save()
    }
    return res.json({result});
})


module.exports = router;