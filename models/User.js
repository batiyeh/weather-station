'use strict';
var bookshelf = require('../bookshelf');

let User = bookshelf.Model.extend({
    tableName: 'users'
});
let Sessions = bookshelf.Model.extend({
    tableName: 'sessions'
});

module.exports = User;
module.exports = Sessions;