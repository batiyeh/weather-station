'use strict';
var bookshelf = require('../bookshelf');


let Weather = bookshelf.Model.extend({
    tableName: 'weather'
});

module.exports = Weather;