'use strict';
var bookshelf = require('../bookshelf');

let Sessions = bookshelf.Model.extend({
    tableName: 'sessions'
});

module.exports = Sessions;