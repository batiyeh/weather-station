'use strict';
var knex = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'weatherstation',
    password : 'ws1234',
    database : 'weatherstation',
    connectionLimit : 50, // Limits the number of open connections to mysql (ie the rpis)
  }
};

module.exports = knex;