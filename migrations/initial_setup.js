var knex = require('knex')(require('../knexfile'))

// Create all tables for future use
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.hasTable('stations').then(function(exists) {
            if (!exists) {
                knex.schema.createTable('stations', function (table) {
                    table.increments('station_id');
                    table.timestamps(true, true);
                    table.string('mac_address');
                    table.string('station_name');
                    table.float('temperature');
                    table.float('humidity');
                    table.float('pressure');
                    table.boolean('connected');
                })
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('stationWeather').then(function(exists){
            if (!exists){
                knex.schema.createTable('stationsWeather', function(table){
                    table.increments('station_id');
                    table.timestamps(true, true);
                    table.string('mac_address');
                    table.string('station_name');
                    table.float('temperature');
                    table.float('humidity');
                    table.float('pressure');
                })
                .then(() =>{})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('apiWeather').then(function(exists){
            if (!exists){
                knex.schema.createTable('apiWeather', function(table){
                    table.increments('station_id');
                    table.timestamps(true, true);
                    table.string('mac_address');
                    table.string('wind_speed');
                    table.float('visibility');
                    table.string('description');
                })
                .then(() =>{})
                .catch((error) => {});
            }
        })
    ]);
};


// Drop all tables in case we need to undo a migration
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.hasTable('stations').then(function(exists) {
            if (exists) {
                knex.schema.dropTable('stations')
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('stationWeather').then(function(exists){
            if (exists) {
                knex.schema.dropTable('stationWeather')
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('apiWeather').then(function(exists){
            if (exists) {
                knex.schema.dropTable('apiWeather')
                .then(() => {})
                .catch((error) => {});
            }
        })
    ]);
};