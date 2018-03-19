var knex = require('knex')(require('../knexfile'))

// Create all tables for future use
exports.up = function(knex, Promise) {
    return knex.schema.createTable('permissions', function(table){
            table.increments('permission_id').primary();
            table.string('type', 16);
        })
        .createTable('users', function(table){
            table.string('username', 32).primary();
            table.string('password', 64).unique();
            table.string('email', 128).unique();
            table.string('phone', 10).unique();
            table.string('reset_password_token', 20);
            table.dateTime('reset_password_expires');
            table.integer('permission_id').references('permission_id').inTable('permissions').unsigned().onDelete('SET NULL').onUpdate('CASCADE');
        })
        .createTable('stations', function (table) {
            table.string('apikey', 20).primary();
            table.string('station_name', 64);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('last_connected').defaultTo(knex.fn.now());
            table.dateTime('expiration');
            table.boolean('connected');
            table.string('username').references('username').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        })
        .createTable('weather', function(table){
            table.increments('weather_id').primary();
            table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable().index();
            table.float('temperature', 5, 2);
            table.float('humidity', 5, 2);
            table.float('pressure', 6, 2);
            table.string('latitude');
            table.string('longitude');
            table.integer('visibility', 4);
            table.float('wind_speed', 5, 2);
            table.float('wind_direction', 5, 2);
            table.string('apikey', 20).references('apikey').inTable('stations').onDelete('SET NULL').onUpdate('CASCADE');
        })
        .createTable('latestweather', function(table){
            table.integer('weather_id').references('weather_id').inTable('weather').unsigned().onDelete('CASCADE').onUpdate('CASCADE');
            table.string('apikey', 20).references('apikey').inTable('stations').onDelete('CASCADE').onUpdate('CASCADE');
            table.primary(['weather_id', 'apikey']);
        })
        .createTable('alerts', function(table){
            table.increments('alert_id').primary();
            table.string('type');
            table.string('keyword');
            table.string('threshold');
            //dont set default value to time created
            table.timestamp('last_triggered');
            table.string('station_name', 64);
            table.string('username').references('username').inTable('users').onDelete('SET NULL').onUpdate('CASCADE');
        })
        .createTable('alertvalues', function(table){
            table.increments('value_id').primary();
            table.float('value', 5, 2);
            table.integer('alert_id').references('alert_id').inTable('alerts').unsigned().onDelete('SET NULL').onUpdate('CASCADE');
        })
        .createTable('alertmethods', function(table){
            table.increments('method_id').primary();
            table.string('method', 16);
            table.integer('alert_id').references('alert_id').inTable('alerts').unsigned().onDelete('SET NULL').onUpdate('CASCADE');
        })
        .createTable('triggeredalerts', function(table){
            table.increments('triggered_id').primary();
            table.boolean('read');
            table.boolean('cleared');
            table.string('method', 16);
            table.float('temperature', 5, 2);
            table.float('humidity', 5, 2);
            table.float('pressure', 6, 2);
            table.timestamp('triggered_at');
            table.integer('alert_id').references('alert_id').inTable('alerts').unsigned().onDelete('SET NULL').onUpdate('CASCADE');            
        })
};


// Drop all tables in case we need to undo a migration
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('alertvalues')
    .dropTable('alertmethods')
    .dropTable('alerts')
    .dropTable('latestweather')
    .dropTable('weather')
    .dropTable('stations')
    .dropTable('users')
    .dropTable('permissions')
    .dropTable('triggeredalerts')
};