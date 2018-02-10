var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'weatherstation',
      password : 'ws1234',
      database : 'weatherstation'
    }
});

console.log("Dropping Existing Tables ...");

// Drop the station table if it exists
knex.schema.hasTable('stations').then(function(exists) {
    if (exists) {
        knex.schema.dropTable('stations')
        .then(() => {})
        .catch((error) => {});
    }
})

// Create the stations table with the correct columns
.then(function(){
    console.log("Creating Database Tables ...");
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
    .then(function(){})
    .catch(function(e) {
        console.error(e);
    });
})

.then(function() {
    return knex.insert({mac_address: '00:00:00:00:00:00', station_name: 'test', temperature: 72.7, humidity: 85, pressure: 1097, connected: false}).into('stations');
})

.map(function(row) {
    console.log("Successfully Created Schema");
    process.exit()
})

.catch(function(e) {
    console.error(e);
});