(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($state, localStorageService) {
        var vm = this;

        vm.collapsed = true;

        vm.logout = logout;

        function logout() {
            localStorageService.clearAll();
            $state.go('auth.login');
        }
    }

}());