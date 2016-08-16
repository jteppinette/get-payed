(function() {
    'use strict';

    angular
        .module('dashboard.account')
        .controller('AccountController', AccountController);

    function AccountController($scope, AccountService, localStorageService) {
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
            AccountService.update(address, email, password)
                .then(function(account) {
                    vm.email = account.email;
                    vm.address = account.address;
                    vm.password = undefined;
                    $scope.dashboard.email = account.email;
                });
        }
    }

}());
