var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Station = require('../models/Station');

// Creates a new station via post request
router.post('/', function (req, res) {
    new Station({
        mac_address: req.body.mac_address,
        station_name: req.body.station_name,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        pressure: req.body.pressure,
        connected: req.body.connected
    })
    .save()
    .then(function(saved) {
        res.json({ saved });
    });
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
        Station.where('station_id', req.params.station_id).fetch()
        .then(function(station) {
            station.save({
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