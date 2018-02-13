var knex = require('knex')(require('../knexfile'))

// Create all tables for future use
exports.up = function(knex) {
    return knex.schema.hasTable('stations').then(function(exists) {
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
    });

};
exports.up = function(knex){
    return knex.schema.hasTable('users').then(function(exists){
        if (!exists) {
            knex.schema.createTable('users', function(table){
                table.increments('user_id');
                table.string('user_name').unique();
                table.string('password').unique();
                table.boolean('isAdmin');
                table.float('phone').unique();
            })
            .then(() => {})
            .catch((error) => {});
        }
    });
}
// Drop all tables in case we need to undo a migration
exports.down = function(knex) {
    knex.schema.hasTable('stations').then(function(exists) {
        if (exists) {
            knex.schema.dropTable('stations')
            .then(() => {})
            .catch((error) => {});
        }
    });
    knex.schema.hasTable('users').then(function(exists) {
        if (exists) {
            knex.schema.dropTable('users')
            .then(() => {})
            .catch((error) => {});
        }
    });
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