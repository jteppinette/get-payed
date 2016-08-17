(function() {
    'use strict';

    angular
        .module('dashboard.overview')
        .controller('OverviewController', OverviewController);

    function OverviewController(AddressService, localStorageService) {
        var vm = this;

        vm.address = undefined;
        vm.summary = undefined;

        initialize();

        function initialize() {
            vm.address = localStorageService.get('address');
            AddressService.summary(vm.address)
                .then(function(summary) {
                    vm.summary = summary;
                });
        }
    }

}());
