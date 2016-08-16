(function() {
    'use strict';

    angular
        .module('dashboard')
        .factory('DashboardService', DashboardService);

    function DashboardService($state, localStorageService) {
        return {
            logout: logout
        };

        function logout() {
            localStorageService.clearAll();
            return $state.go('auth.login');
        }
    }

}());
