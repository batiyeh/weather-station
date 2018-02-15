var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Station = require('../models/Station');

// Creates a new station via post request
router.post('/', async function (req, res) {
    // Checks if the MAC address already exists in the table. If it does,
    // we update the row. If not, we create a new row.
    var station = await Station.where('mac_address', req.body.mac_address).fetch();
    // If the station already exists, update it.
    // TODO: There might be a better way to update where we don't have to select again
    if (station){
        var result = await Station.where('mac_address', req.body.mac_address).save({
            station_name: req.body.station_name,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            pressure: req.body.pressure,
            connected: req.body.connected
        }, {patch:true});
    }

    // If the station doesn't exist, create a new one and insert it.
    else {
        // Save can both insert a new model and update an existing one
        // with the 'patch' attribute
        var result = await new Station({
            mac_address: req.body.mac_address,
            station_name: req.body.station_name,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            pressure: req.body.pressure,
            connected: req.body.connected
        }).save()
    }
    return res.json({result});
});

// Returns all stations in the database
router.get('/', async function (req, res) {
    var stations = await Station.fetchAll();
    return res.json({ stations });
});

// Returns a single station by ID and either updates or deletes it depending on request params
router.route('/:id')
    // Update existing station 
    .put(async function(req, res){
        var result = await Station.where('station_id', req.params.station_id).save({
            mac_address: req.body.mac_address,
            station_name: req.body.station_name,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            pressure: req.body.pressure,
            connected: req.body.connected
        });
        return res.json({result});
    })
    // Delete existing station
    .delete(async function(req, res) {
        var result = await Station.where('station_id', req.params.station_id).destroy();
        res.json({result});
    });


module.exports = router;