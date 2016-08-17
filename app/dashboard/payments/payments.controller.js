(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .controller('PaymentsController', PaymentsController);

    function PaymentsController($scope, PaymentsService, AddressService, localStorageService) {
        var vm = this;

        vm.create = create;

        vm.history = [];
        vm.address = undefined;

        initialize();

        function initialize() {
            vm.address = localStorageService.get('address');
            getHistory();
            $scope.$on('payments:refresh', getHistory);
            function getHistory() {
                return AddressService.history(vm.address)
                    .then(function(history) {
                        vm.history = history;
                    });
            }
        }

        function create() {
            PaymentsService.create();
        }
    }

}());
