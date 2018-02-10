'use strict';
var knex = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'weatherstation',
    password : 'ws1234',
    database : 'weatherstation'
  }
};

module.exports = knex;