'use strict';

module.exports = angular.module('gitersApp.giterlist', [
    'ui.router'
])
.config(($stateProvider) => {
    $stateProvider
        .state('giters', {
            url: '/',
            template: '<h1>giters</h1><div ui-view></div>',
        })
        .state('giters.users', {
            url: 'users',
            templateUrl: 'modules/users/users.tpl.html',
            controller: 'gitersListController',
            controllerAs: 'vm',
            bindToController: true
        });
})

.controller('gitersListController', [
    '$log',
    'UserFactory',
    'SearchUsersFactory',
    'LinkHeaderProcessor',
    gitersListController
]);

function gitersListController($log, UserFactory, SearchUsersFactory, LinkHeaderProcessor) {
    var vm = this;
    vm.locationQuery = 'Bangalore';
    vm.searchLocationUsers = function(location) {
         SearchUsersFactory
            .query({
                location: location
            })
            .then((data) => {
                vm.data = data;
                vm.headers = data.$httpHeaders('Link');
                vm.users = data.items;
                $log.debug(vm.data, vm.headers);
                vm.pagination = LinkHeaderProcessor.pagination(vm.headers);
            })
            .catch((err) => console.log(err));
    }
    vm.loadMoreUsers = function(nexturl) {
        SearchUsersFactory
            .next(nexturl)
            .then((data) => {
                vm.headers = data.$httpHeaders('Link');
                vm.users = vm.users.concat(data.items);
                vm.pagination = LinkHeaderProcessor.pagination(vm.headers);
            })
            .catch((err) => console.log(err));
    }
}
