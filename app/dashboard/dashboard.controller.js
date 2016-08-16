(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($state, DashboardService, localStorageService) {
        var vm = this;

        vm.collapsed = true;
        vm.email = undefined;

        vm.logout = DashboardService.logout;

        initialize();

        function initialize() {
            vm.email = localStorageService.get('email');
        }
    }

}());
