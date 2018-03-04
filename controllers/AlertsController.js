const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Alerts = require('../models/Alerts');
const AlertValues = require('../models/AlertValues');
const AlertMethods = require('../models/AlertMethods');
const Station = require('../models/Station')
const knex = require('knex')(require('../knexfile'));


//post request that creates a new alert for the user
router.post('/create', async function(req, res){
    //values passed by frontend
    var station = req.body.station;
    var datatype = req.body.datatype;
    var keyword = req.body.keyword;
    var value1 = req.body.value1;
    var value2 = req.body.value2;
    var email = req.body.email;
    var sms = req.body.sms;
    var webpage = req.body.webpage;

    //creating new alert
    var newAlert = await new Alerts({
        station_name: station,
        type: datatype,
        keyword: keyword,
        username: req.user
    }).save();
    //assigns values to new alert via foreign key
    await new AlertValues({
        value: value1,
        alert_id: newAlert.attributes.id

    }).save();
    //if second value is passes, also assigns to new alert via foreign key
    if(value2){
        await new AlertValues({
            value: value2,
            alert_id: newAlert.attributes.id
        }).save();
    }
    if(email){
        await new AlertMethods({
            method: 'email',
            alert_id: newAlert.attributes.id
        }).save();
    }
    if(sms){
        await new AlertMethods({
            method: 'sms',
            alert_id: newAlert.attributes.id
        }).save();
    }
    if(webpage){
        await new AlertMethods({
            method: 'webpage',
            alert_id: newAlert.attributes.id
        }).save();
    }

    //success
    return res.status(200).json({newAlert})
})

//post request to retrieve all alerts currently stored in the database for that user
//this function is a post because we have to pass the user's session information
router.post('/', async function(req, res){

    //selects all alerts for user, joins alerts and alertvalues based on alert_id
    var alerts = await knex('alerts')
    .select('alerts.alert_id', 'alerts.station_name', 'alerts.type', 'alerts.keyword', 'alerts.last_triggered', 'alertvalues.value', 'alertmethods.method')
    .leftJoin('alertvalues', 'alerts.alert_id', '=', 'alertvalues.alert_id')
    .leftJoin('alertmethods', 'alerts.alert_id', '=', 'alertmethods.alert_id')
    .where('alerts.username', req.user)

    var stations = await Station.fetchAll();

    return res.status(200).json({alerts, stations});
})

//post used to update an alert based on the :id passed by the frontend
router.post('/:id', async function(req,res){

    //values passed by frontend
    var station = req.body.station;
    var datatype = req.body.datatype;
    var keyword = req.body.keyword;
    var value1 = req.body.value1;
    var value2 = req.body.value2;
    var email = req.body.email;
    var sms = req.body.sms;
    var webpage = req.body.webpage;

    //finds alert based on id passed by frontend
    await Alerts.where({alert_id: req.params.id}).save({
        station_name: station,
        type: datatype,
        keyword: keyword
    },{patch:true})
    
    //deletes old values associated with that alert
    await AlertValues.where({alert_id: req.params.id}).destroy();
    await AlertMethods.where({alert_id: req.param.id}).destroy();

    //stores new values, associates to alert by foreign key
    await new AlertValues({
        value: value1,
        alert_id: req.params.id
    }).save();

    //if two values are passed, creates row for second alert as well
    if(value2){
        await new AlertValues({
            value: value2,
            alert_id: req.params.id
        }).save();
    }
    if(email){
        await new AlertMethods({
            method: 'email',
            alert_id: req.params.id
        }).save();
    }
    if(sms){
        await new AlertMethods({
            method: 'sms',
            alert_id: req.params.id
        }).save();
    }
    if(webpage){
        await new AlertMethods({
            method: 'webpage',
            alert_id: req.params.id
        }).save();
    }

    return res.status(200).json({success: 'success'})
})

module.exports = router;