(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .controller('PaymentsController', PaymentsController);

    function PaymentsController($scope, PaymentsService) {
        var vm = this;

        vm.create = create;

        vm.payments = [];

        initialize();

        function initialize() {
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
