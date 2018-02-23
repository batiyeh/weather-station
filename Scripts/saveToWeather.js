var knex = require('knex')(require('../knexfile'))

module.exports =  {
    saveToWeather(){
        knex('stations').select('mac_address', 'temperature', 'humidity', 'pressure', 'latitude', 'longitude')
        .where('connected', '1')
        .then((rows) => knex('weather').insert(rows));
    }
}
