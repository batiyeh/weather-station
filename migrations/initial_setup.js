var knex = require('knex')(require('../knexfile'))

// Create all tables for future use
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.hasTable('stations').then(function(exists) {
            if (!exists) {
                knex.schema.createTable('stations', function (table) {
                    table.string('station_name', 64).primary();
                    table.timestamp('created_at').defaultTo(knex.fn.now());
                    table.string('key', 20);
                    table.dateTime('expiration');
                    table.boolean('connected');
                    table.string('username').references('username').inTable('users');
                })
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('weather').then(function(exists){
            if (!exists){
                knex.schema.createTable('weather', function(table){
                    table.increments('weather_id').primary();
                    table.timestamp('created_at').defaultTo(knex.fn.now());
                    table.float('temperature', 5, 2);
                    table.float('humidity', 5, 2);
                    table.float('pressure', 6, 2);
                    table.string('latitude');
                    table.string('longitude');
                    table.integer('visibility', 4);
                    table.float('wind_speed', 5, 2);
                    table.float('wind_direction', 5, 2);
                    table.string('key', 20).references('key').inTable('stations');
                })
                .then(() =>{})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('users').then(function(exists){
            if (!exists) {
                knex.schema.createTable('users', function(table){
                    table.string('username', 64).primary();
                    table.string('password', 64).unique();
                    table.string('email', 128).unique();
                    table.string('phone', 10).unique();
                    table.string('reset_password_token', 20);
                    table.dateTime('reset_password_expires');
                    table.integer('permissions').references('permission_id').inTable('permissions');
                })
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('permissions').then(function(exists){
            if (!exists) {
                knex.schema.createTable('permissions', function(table){
                    table.increments('permission_id').primary();
                    table.string('type', 16);
                })
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('alerts').then(function(exists){
            if(!exists) {
                knex.schema.createTable('alerts', function(table){
                    table.increments('alert_id').primary();
                    table.string('type');
                    table.string('keyword');
                    table.dateTime('last_triggered');
                    table.integer('value_id').references('value_id').inTable('alertvalues');
                    table.string('username').references('username').inTable('users');
                })
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('alertvalues').then(function(exists){
            if(!exists){
                knex.schema.createTable('alertvalues', function(table){
                    table.increments('value_id').primary();
                    table.float('value', 5, 2);
                    table.integer('alert_id').references('alert_id').inTable('alerts');
                })
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('alertmethods').then(function(exists){
            if(!exists){
                knex.schema.createTable('alertmethods', function(table){
                    table.increments('method_id').primary();
                    table.string('method', 16);
                    table.integer('alert_id').references('alert_id').inTable('alerts');
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
        knex.schema.hasTable('users').then(function(exists) {
            if (exists) {
                knex.schema.dropTable('users')
                .then(() => {})
                .catch((error) => {});
            }
        }),
        knex.schema.hasTable('permissions').then(function(exists){
            if (exists) {
                knex.schema.dropTable('permissions')
                    .then(() => {})
                    .catch((error) => {});
            }
        }),
        knex.schema.hasTable('alerts').then(function(exists){
            if (exists) {
                knex.schema.dropTable('alerts')
                    .then(() => {})
                    .catch((error) => {});
            }
        }),
        knex.schema.hasTable('alertvalues').then(function(exists){
            if (exists) {
                knex.schema.dropTable('alertvalues')
                    .then(() => {})
                    .catch((error) => {});
            }
        }),
        knex.schema.hasTable('alertmethods').then(function(exists){
            if (exists) {
                knex.schema.dropTable('alertmethods')
                    .then(() => {})
                    .catch((error) => {});
            }
        })
    ]);
};