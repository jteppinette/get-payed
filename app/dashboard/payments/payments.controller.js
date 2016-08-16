(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .controller('PaymentsController', PaymentsController);

    function PaymentsController(PaymentsService) {
        var vm = this;

        vm.create = create;

        vm.payments = [];

        initialize();

        function initialize() {
            vm.payments = [{id: 5}];
        }

        function create() {
            PaymentsService.create()
                .then(function(payment) {
                    vm.payments.append(payment);
                });
        }
    }

}());
