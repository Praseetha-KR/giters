'use strict';

module.exports = angular.module('gitersApp.api', [
    'ngResource'
])

.factory('UserFactory', ['$resource', UserFactory ]);

function UserFactory($resource) {
    var userResource = $resource('https://api.github.com/users/:username', null, {
        query: {
            isArray: false
        }
    }, {
        stripTrailingSlashes: false
    });
    return {
        query: (username) => {
            return userResource.query({
                username: username
            }).$promise;
        }
    }
}
