const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Alerts = require('../models/Alerts');
const AlertValues = require('../models/AlertValues');


router.post('/create', async function(req, res){
    var datatype = req.body.datatype;
    var keyword = req.body.keyword;
    var value1 = req.body.value1;
    var value2 = req.body.value2;

    var newAlert = await new Alerts({
        type: datatype,
        keyword: keyword,
        user_name: req.user
    }).save();

    var newAlertValue = await new AlertValues({
        value: value1,
        alert_id: newAlert.attributes.id

    }).save();

    await Alerts.where({alert_id: newAlert.attributes.id}).save({
        value_id: newAlertValue.attributes.id
    },{patch:true});
    // console.log(newAlertValue.attributes.id);
    // newAlert.fetch().save({
    //     value_id: newAlertValue.attributes.id
    // });
})

module.exports = router;