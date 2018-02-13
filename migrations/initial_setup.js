var knex = require('knex')(require('../knexfile'))

// Create all tables for future use
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.hasTable('stations').then(function(exists) {
        if (!exists) {
            knex.schema.createTable('stations', function (table) {
                table.increments('station_id');
                table.timestamps();
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
                    table.increments('station_id');
                    table.timestamps();
                    table.string('mac_address');
                    table.string('station_name');
                    table.float('temperature');
                    table.float('humidity');
                    table.float('pressure');
                    table.boolean('connected');
                })
                    .then(() =>{})
            .catch((error) => {});
            }
        }),
        knex.schema.hasTable('station').then(function(exists) {
            if (!exists){
                knex.schema.createTable('station', function(table){
                    table.timestamps('connected_at');
                    table.string('stationid');
                    table.increments('station_id');
                    table.timestamps();
                    table.string('mac_address');
                    table.string('station_name');
                    table.float('temperature');
                    table.float('humidity');
                    table.float('pressure');
                    table.boolean('connected');
                })
                    .then(() =>{})
            .catch((error) => {});
            }
        }),
        knex.schema.hasTable('apiWeather').then(function(exists){
            if (!exists){
                knex.schema.createTable('apiWeather', function(table){
                    table.string('wind_speed');
                    table.increments('station_id');
                    table.timestamps();
                    table.string('mac_address');
                    table.string('station_name');
                    table.float('temperature');
                    table.float('humidity');
                    table.float('pressure');
                    table.boolean('connected');
                })
                    .then(() =>{})
            .catch((error) => {});
            }
        });
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
    knex.schema.hasTable('station').then(function(exists){
        if (exists) {
            knex.schema.dropTable('station')
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
};

// .then(function() {
//     return knex.insert({mac_address: '00:00:00:00:00:00', station_name: 'test', temperature: 72.7, humidity: 85, pressure: 1097, connected: false}).into('stations');
// })

// .map(function(row) {
//     console.log("Successfully Created Schema");
//     process.exit()
// })

// .catch(function(e) {
//     console.error(e);
// });