'use strict';

module.exports = angular.module('gitersApp', [
    'ui.router',
    require('./api').name,
    require('./users').name
]);
