const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Alerts = require('../models/Alerts');
const AlertValues = require('../models/AlertValues');
const knex = require('knex')(require('../knexfile'));



router.post('/create', async function(req, res){
    
    var datatype = req.body.datatype;
    var keyword = req.body.keyword;
    var value1 = req.body.value1;
    var value2 = req.body.value2;

    var newAlert = await new Alerts({
        type: datatype,
        keyword: keyword,
        username: req.user
    }).save();

    await new AlertValues({
        value: value1,
        alert_id: newAlert.attributes.id

    }).save();

    if(value2){
        await new AlertValues({
            value: value2,
            alert_id: newAlert.attributes.id
        }).save();
    }
    console.log(newAlert);
})
router.post('/', async function(req, res){

    var alerts = await knex('alerts')
    .select('alerts.alert_id', 'alerts.type', 'alerts.keyword', 'alerts.last_triggered', 'alertvalues.value')
    .leftJoin('alertvalues', 'alerts.alert_id', '=', 'alertvalues.alert_id')
    .where('alerts.username', req.user)

    return res.json({alerts});
})

router.post('/:id', async function(req,res){
    var datatype = req.body.datatype;
    var keyword = req.body.keyword;
    var value1 = req.body.value1;
    var value2 = req.body.value2;

    await Alerts.where({alert_id: req.params.id}).save({
        type: datatype,
        keyword: keyword
    },{patch:true})
    
    await AlertValues.where({alert_id: req.params.id}).destroy();

    await new AlertValues({
        value: value1,
        alert_id: req.params.id
    }).save();

    if(value2){
        await new AlertValues({
            value: value2,
            alert_id: req.params.id
        }).save();
    }

})

module.exports = router;