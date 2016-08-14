(function() {
    'use strict';

    angular
        .module('dashboard.overview')
        .controller('OverviewController', OverviewController);

    function OverviewController($http) {
        var vm = this;

        vm.users = [];

        initialize();

        function initialize() {
            return $http.get("api/users")
                .then(function(http) {
                    vm.users = http.data;
                });
        }
    }

}());
