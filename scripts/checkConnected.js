const knex = require('knex')(require('../knexfile'));
const fetch = require("node-fetch");
const moment = require('moment');
moment().format();

// If the station has not sent data for longer than 30 seconds we will 
// Update the connected column to be false.
async function checkConnected(){
    var now = new Date();
    var stations = await knex('stations').select('mac_address', 'updated_at', 'connected');
    
    for (var i = 0; i < stations.length; i++){
        var station = stations[i];
        if (((moment() - moment(station.updated_at)) > 30000) && station.connected == '1'){
            knex('stations')
                .where({mac_address: station.mac_address})
                .update({
                    connected: false,
                })
                .then()
        }
    }
}

module.exports =  {
    checkConnected
}
