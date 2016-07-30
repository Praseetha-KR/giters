'use strict';
module.exports = angular.module('kFormat', [])
.filter('kFormat', function() {
    return function(number){
        if (number >= 10000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number.toString();
    };
});
