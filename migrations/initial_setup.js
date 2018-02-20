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
                    table.float('temperature');
                    table.float('humidity');
                    table.float('pressure');
                    table.string('latitude');
                    table.string('longitude');
                    table.boolean('connected');
                })
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('weather').then(function(exists){
            if (!exists){
                knex.schema.createTable('weather', function(table){
                    table.increments('weather_id');
                    table.timestamps(true, true);
                    table.string('mac_address');
                    table.float('temperature');
                    table.float('humidity');
                    table.float('pressure');
                    table.string('latitude');
                    table.string('longitude');
                    table.boolean('connected');
                })
                .then(() =>{})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('station_names').then(function(exists){
            if (!exists){
                knex.schema.createTable('station_names', function(table){
                    table.increments('name_id');
                    table.timestamps(true, true);
                    table.string('mac_address');
                    table.string('name');
                })
                .then(() =>{})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('users').then(function(exists){
            if (!exists) {
                knex.schema.createTable('users', function(table){
                    table.increments('user_id');
                    table.string('user_name').unique();
                    table.string('password').unique();
                    table.string('email').unique();
                    table.boolean('isAdmin');
                    table.float('phone').unique();
                    table.string('reset_password_token');
                    table.date('reset_password_expires');
                })
                .then(() => {})
                .catch((error) => {});
            }
        })
    ])
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
        knex.schema.hasTable('weather').then(function(exists){
            if (exists) {
                knex.schema.dropTable('weather')
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('station_names').then(function(exists){
            if (exists) {
                knex.schema.dropTable('apiWeather')
                    .then(() => {})
                    .catch((error) => {});
            }
        }),
        knex.schema.hasTable('users').then(function(exists) {
            if (exists) {
                knex.schema.dropTable('users')
                .then(() => {})
                .catch((error) => {});
            }
        })
    ]);
};