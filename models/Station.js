'use strict';
var bookshelf = require('../bookshelf');

let Station = bookshelf.Model.extend({
    tableName: 'stations'
});

module.exports = Station;