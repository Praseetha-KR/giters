'use strict';

module.exports = angular.module('gitersApp.api', [
    'ngResource'
])

.factory('UserFactory', ['$resource', UserFactory ])
.factory('SearchUsersFactory', ['$resource', SearchUsersFactory ])
.service('LinkHeaderProcessor', [LinkHeaderProcessor]);

function LinkHeaderProcessor() {
    this.pagination = function(link) {
        var obj;
        if (link) {
            var nextlastarr = link.split(', ');
            obj = {
                next: nextlastarr[0].replace('<', '').replace('>; rel="next"', ''),
                last: nextlastarr[1].replace('<', '').replace('>; rel="last"', '')
            }
        } else {
            obj = {
                next: null,
                last: null
            }
        }
        return obj;

    }
}
function SearchUsersFactory($resource) {
    var searchUsersResource = $resource('https://api.github.com/search/users?q=location::location+type::type', null, {
        query: {
            isArray: false,
            interceptor: {
                response: function(response) {
                    response.resource.$httpHeaders = response.headers;
                    return response.resource;
                }
            }
        }
    }, {
        stripTrailingSlashes: false
    });
    return {
        query: (q) => {
            return searchUsersResource.query({
                location: q.location,
                type: 'User'
            }).$promise;
        },
        next: (url) => {
            var page = url.split('?page=')[1];
            return $resource(url, {}, {
                query: {
                    isArray: false,
                    interceptor: {
                        response: function(response) {
                            response.resource.$httpHeaders = response.headers;
                            return response.resource;
                        }
                    }
                }
            }, {}).query().$promise;
        }
    }
}

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
