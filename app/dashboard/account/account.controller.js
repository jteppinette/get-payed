(function() {
    'use strict';

    angular
        .module('dashboard.account')
        .controller('AccountController', AccountController);

    function AccountController($http, $scope, localStorageService) {
        var vm = this;

        vm.email = undefined;
        vm.address = undefined;
        vm.password = undefined;

        vm.update = update;

        initialize();

        function initialize() {
            vm.address = localStorageService.get('address');
            vm.email = localStorageService.get('email');
        }

        function update(email, password, address) {
            $http.post('api/account', {address: address, email: email, password: password})
                .then(function(http) {
                    var account = http.data;

                    vm.email = account.email;
                    vm.address = account.address;
                    vm.password = undefined;

                    localStorageService.set('token', account.token);
                    localStorageService.set('email', account.email);
                    localStorageService.set('address', account.address);

                    $scope.dashboard.email = account.email;
                });
        }
    }

}());
