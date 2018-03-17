const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Alerts = require('../models/Alerts');
const AlertValues = require('../models/AlertValues');
const AlertMethods = require('../models/AlertMethods');
const WebpageAlerts = require('../models/WebpageAlerts');
const Station = require('../models/Station');
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
    var threshold = req.body.threshold;

    //prevents user from submitting blank value
    if(keyword === 'between' && !value2){
        return res.status(404);
    }
    //prevents user from submitting blank value or not selecting an alert method
    if(value1 && (email || sms || webpage)){
        var newAlert = await new Alerts({
            station_name: station,
            type: datatype,
            keyword: keyword,
            threshold: threshold,
            username: req.user
        }).save();
        //assigns values to new alert via foreign key
        await new AlertValues({
            value: value1,
            alert_id: newAlert.attributes.id

        }).save();

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
        if(value2){
            await new AlertValues({
                value: value2,
                alert_id: newAlert.attributes.id
            }).save();
        }
    }

    //success
    return res.status(200).json({newAlert})
})
router.post('/webpage', async function(req, res){
    //gets all webpage alerts for user and returns them to frontend
    var alerts = await knex('webpagealerts')
    .select('alerts.alert_id', 'alerts.type','alerts.keyword', 'alerts.station_name', 'webpagealerts.read', 'webpagealerts.temperature', 'webpagealerts.humidity', 'webpagealerts.pressure', 'webpagealerts.triggered_at', 'alertvalues.value')
    .leftJoin('alerts', 'webpagealerts.alert_id', '=', 'alerts.alert_id')
    .leftJoin('alertvalues', 'alerts.alert_id', '=', 'alertvalues.alert_id')
    .where('alerts.username', req.user);

    return res.status(200).json({alerts});
})

router.post('/read', async function(req, res){
    //sets all alerts for req.user to read
    var response = await knex('webpagealerts')
    .update('webpagealerts.read', true).
    leftJoin('alerts', 'webpagealerts.alert_id','=','alerts.alert_id')
    .where('webpagealerts.read','=', false, 'alerts.username','=', req.user);

    return res.status(200);
})
router.delete('/webpage', async function(req, res){
    //get all webpage id's for that user
    var alerts = await knex('webpagealerts')
    .select('webpage_id')
    .leftJoin('alerts', 'webpagealerts.alert_id','=','alerts.alert_id')
    .where('username', req.user)

    //delete all webpage alerts for user
    alerts.map(async (alerts) => {
        await WebpageAlerts.where({webpage_id: alerts.webpage_id}).destroy();
    })

    return res.status(200);
})
//post request to retrieve all alerts currently stored in the database for that user
//this function is a post because we have to pass the user's session information
router.post('/', async function(req, res){

    //selects all alerts for user, joins alerts and alertvalues based on alert_id
    var alerts = await knex('alerts')
    .select('alerts.alert_id', 'alerts.station_name', 'alerts.type', 'alerts.keyword', 'alerts.last_triggered', 'alerts.threshold', 'alertvalues.value')
    .leftJoin('alertvalues', 'alerts.alert_id', '=', 'alertvalues.alert_id')
    .where('alerts.username', req.user)

    var stations = await Station.fetchAll();

    return res.status(200).json({alerts, stations});
})
//returns all alert methods selected for that alert
router.get('/:id', async function(req, res){
    var methods = await knex('alertmethods')
    .select('alertmethods.method')
    .where('alertmethods.alert_id','=', req.params.id);

    return res.status(200).json({methods})
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
    var threshold = req.body.threshold;

    //prevents user from entering blank value
    if(keyword === 'between' && !value2){
        return res.status(404);
    }

    //Prevents user from submitting blank value or not selecting an alert method
    if(value1 && (email || sms || webpage)){
        await Alerts.where({alert_id: req.params.id}).save({
            station_name: station,
            type: datatype,
            threshold: threshold,
            keyword: keyword
        },{patch:true})
        
        //deletes old values associated with that alert
        await AlertValues.where({alert_id: req.params.id}).destroy();
        await AlertMethods.where({alert_id: req.params.id}).destroy();

        //stores new values, associates to alert by foreign key
        await new AlertValues({
            value: value1,
            alert_id: req.params.id
        }).save();

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
        if(value2){
            await new AlertValues({
                value: value2,
                alert_id: req.params.id
            }).save();
        }
    }
    return res.status(200).json({success: 'success'})
})
router.delete('/:id', async function(req, res){
    //deletes alerts with the id passed from front end
    AlertValues.where({alert_id: req.params.id}).destroy();
    AlertMethods.where({alert_id: req.params.id}).destroy();
    Alerts.where({alert_id: req.params.id}).destroy();

    res.status(200);
})

module.exports = router;