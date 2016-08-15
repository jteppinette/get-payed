(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .controller('PaymentsController', PaymentsController);

    function PaymentsController($uibModal) {
        var vm = this;

        vm.create = create;

        vm.payments = [];

        initialize();

        function initialize() {
            vm.payments = [{id: 5}];
        }

        function create() {
            return $uibModal.open({
                templateUrl: 'dashboard/payments/create/create.html',
                controller: 'CreatePaymentsController',
                controllerAs: 'create',
                size: 'md'
            }).result
                .then(function(payment) {
                    vm.payments.append(result);
                });
        }
    }

}());
