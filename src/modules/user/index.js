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
        .state('giters.user', {
            url: 'user',
            template: '<div>{{ vm.msg }}</div>',
            controller: 'gitersListController',
            controllerAs: 'vm',
            bindToController: true
        });
})

.controller('gitersListController', [
    '$scope',
    'UserFactory',
    gitersListController
]);

function gitersListController($scope, UserFactory) {
    var vm = this;
    vm.msg = 'parent';
    UserFactory.query('Praseetha-KR')
        .then((data) => {
            console.log(data);
            vm.msg = data;
        })
        .catch((err) => console.log(err));
}
