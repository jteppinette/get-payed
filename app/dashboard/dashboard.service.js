(function() {
    'use strict';

    angular
        .module('dashboard')
        .factory('DashboardService', DashboardService);

    function DashboardService($state, localStorageService, toastr) {
        return {
            logout: logout
        };

        function logout() {
            localStorageService.clearAll();
            return $state.go('auth.login')
                .then(function() {
                    toastr.success("Thank you for using Get Payed.", "Logout Successful");
                });
        }
    }

}());
