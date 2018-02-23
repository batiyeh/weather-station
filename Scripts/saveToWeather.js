var knex = require('knex')(require('../knexfile'))

module.exports =  {
    //Query to save data from stations to weather table
    saveToWeather(){
        knex('stations').select('mac_address', 'temperature', 'humidity', 'pressure', 'latitude', 'longitude')
        .where('connected', '1')
        .then((columns) => knex('weather').insert(columns));
    }
}
