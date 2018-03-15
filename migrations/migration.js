var knex = require('knex')(require('../knexfile'))

// Create all tables for future use
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists("permissions", function (table) {
        table.increment();
        table.string('type');
        }).then(function () {
                return knex("permissions").insert([
                    {type: "Superuser"},
                    {type: "User"},
                    {type: "Admin"},
                    {type: "Pending"}
                ]);
            })
        }),
    ]);

};

// Drop all tables in case we need to undo a migration
exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("permissions")
    ]);

};
