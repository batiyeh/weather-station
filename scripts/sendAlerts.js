const knex = require('knex')(require('../knexfile'))

var alerts = knex('alerts')
.select();
console.log(alerts);

/*

1. Get all alerts + Values
2. Get all weather stations
3. 







*/