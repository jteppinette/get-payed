(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .controller('PaymentsController', PaymentsController);

    function PaymentsController($scope, PaymentsService, localStorageService) {
        var vm = this;

        vm.create = create;

        vm.payments = [];
        vm.address = undefined;

        initialize();

        function initialize() {
            vm.address = localStorageService.get('address');
            getList();
            $scope.$on('payments:refresh', getList);
            function getList() {
                return PaymentsService.list()
                    .then(function(payments) {
                        vm.payments = payments;
                    });
            }
        }

        function create() {
            PaymentsService.create();
        }
    }

}());
