(function() {
    'use strict';

    angular
        .module('dashboard.overview')
        .controller('OverviewController', OverviewController);

    function OverviewController($http, localStorageService) {
        var vm = this;

        vm.users = [];
        vm.address = undefined;

        initialize();

        function initialize() {
            vm.address = localStorageService.get('address');
            return $http.get("api/users")
                .then(function(http) {
                    vm.users = http.data;
                });
        }
    }

}());
