(function() {
    'use strict';

    angular
        .module('dashboard.overview')
        .controller('OverviewController', OverviewController);

    function OverviewController(localStorageService) {
        var vm = this;

        vm.address = undefined;

        initialize();

        function initialize() {
            vm.address = localStorageService.get('address');
        }
    }

}());
