'use strict';
var bookshelf = require('../bookshelf');


let WebpageAlerts = bookshelf.Model.extend({
    tableName: 'webpagealerts'
});

module.exports = WebpageAlerts;