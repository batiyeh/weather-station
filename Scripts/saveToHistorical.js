'use strict';//add node-schedual
var knex = require('knex')(require('../knexfile'))
var bookshelf = require('../bookshelf');

let stations = bookshelf.Model.extend({
    tableName: 'stations'
});
let weather = bookshelf.Model.extend({
    tableName: 'weather'
})





