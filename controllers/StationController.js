const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Station = require('../models/Station');
const knex = require('knex')(require('../knexfile'));

// Creates a new station via post request
router.post('/', async function (req, res) {
    // If the station doesn't exist, create a new one and insert it.
    var result = await new Station({
        station_name: req.body.station_name,
        apikey: req.body.api_key,
        expiration: req.body.expiration,
        connected: false,
        username: req.body.username
    }).save()
    return res.json({result});
});

// Returns all stations in the database
router.get('/', async function (req, res) {
    try{
        var stations = await knex('stations').select().orderBy('station_name', 'desc')
    } catch(ex){
        return res.json({});
    }

    return res.json({ stations });
});

// Returns a single station by ID and either updates or deletes it depending on request params
router.route('/:api_key')
    // Update existing station 
    .put(async function(req, res){
        var result = await Station.where('apikey', req.params.api_key).save({
            station_name: req.body.station_name
        }, {patch:true});
        return res.json({result});
    })
    // Delete existing station
    .delete(async function(req, res) {
        var result = await Station.where('apikey', req.params.api_key).destroy();
        res.json({result});
    });

router.route('/connected/:api_key')
    // Update existing station 
    .put(async function(req, res){
        var result = await Station.where('apikey', req.params.api_key).save({
            connected: req.body.connected,
            last_connected: req.body.last_connected
        }, {patch:true});
        return res.json({result});
    })


module.exports = router;