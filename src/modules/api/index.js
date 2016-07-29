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
    var baseUrl = 'https://api.github.com/search/users';
    var queryModifier = {
        query: {
            isArray: false,
            interceptor: {
                response: function(response) {
                    response.resource.$httpHeaders = response.headers;
                    return response.resource;
                }
            }
        }
    };
    var searchUsersResourceAll  = $resource(baseUrl + '?q=type::type+location::location+language::language', null, queryModifier);
    var searchUsersResourceLoc  = $resource(baseUrl + '?q=type::type+location::location', null, queryModifier);
    var searchUsersResourceLang = $resource(baseUrl + '?q=type::type+language::language', null, queryModifier);
    var searchUsersResource     = $resource(baseUrl + '?q=type::type', null, queryModifier);
    return {
        query: (q) => {
            if(q.location && q.language) {
                return searchUsersResourceAll.query({
                    type: 'User',
                    location: q.location,
                    language: q.language,
                    sort: q.sort,
                    order: q.order
                }).$promise;
            } else if(q.location) {
                return searchUsersResourceLoc.query({
                    type: 'User',
                    location: q.location,
                    sort: q.sort,
                    order: q.order
                }).$promise;
            } else if(q.language) {
                return searchUsersResourceLang.query({
                    type: 'User',
                    language: q.language,
                    sort: q.sort,
                    order: q.order
                }).$promise;
            } else {
                return searchUsersResource.query({
                    type: 'User',
                    sort: q.sort,
                    order: q.order
                }).$promise;
            }
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
