(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($state, localStorageService) {
        var vm = this;

        vm.collapsed = true;
        vm.email = undefined;

        vm.logout = logout;

        initialize();

        function initialize() {
            vm.email = localStorageService.get('email');
        }

        function logout() {
            localStorageService.clearAll();
            $state.go('auth.login');
        }
    }

}());
