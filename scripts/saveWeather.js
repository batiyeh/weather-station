const knex = require('knex')(require('../knexfile'))

// Query to save data from stations to weather table
async function saveToWeather(){
    knex('stations').select('mac_address', 'temperature', 'humidity', 'pressure', 'latitude', 'longitude')
        .where('connected', '1')
        .then((columns) => knex('weather').insert(columns));
}

module.exports =  {
    saveToWeather
}