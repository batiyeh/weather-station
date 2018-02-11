var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Station = require('../models/Station');

// Creates a new station via post request
router.post('/', function (req, res) {
    // Checks if the MAC address already exists in the table. If it does,
    // we update the row. If not, we create a new row.
    Station.where('mac_address', req.body.mac_address).fetch()
    .then(function(station){
        // If the station already exists, update it.
        // TODO: There might be a better way to update where we don't have to select again
        if (station){
            Station.where('mac_address', req.body.mac_address).save({
                station_name: req.body.station_name,
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                pressure: req.body.pressure,
                connected: req.body.connected
            }, {patch:true})
            .then(function(saved) {
                res.json({ saved });
            });
        }

        // If the station doesn't exist, create a new one and insert it.
        else {
            new Station({
                mac_address: req.body.mac_address,
                station_name: req.body.station_name,
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                pressure: req.body.pressure,
                connected: req.body.connected
            })
            // Save can both insert a new model and update an existing one
            // with the 'patch' attribute
            .save()
            .then(function(saved) {
                res.json({ saved });
            });
        }
    })
});

// Returns all stations in the database
router.get('/', function (req, res) {
    Station.fetchAll().then(function(stations) {
        res.json({ stations });
    });
});

// Returns a single station by ID and either updates or deletes it depending on request params
router.route('/:id')
    // Update existing station 
    .put(function(req, res){
        Station.where('station_id', req.params.station_id).save({
            mac_address: req.body.mac_address,
            station_name: req.body.station_name,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            pressure: req.body.pressure,
            connected: req.body.connected
        })
        .then(function(saved) {
            res.json({ saved });
        });
    })
    // Delete existing station
    .delete(function(req, res) {
        Station.where('station_id', req.params.station_id).destroy()
        .then(function(destroyed) {
            res.json({ destroyed });
        });
    });


module.exports = router;