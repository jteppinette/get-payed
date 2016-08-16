(function() {
    'use strict';

    angular
        .module('dashboard.payments.create')
        .controller('CreatePaymentsController', CreatePaymentsController);

    function CreatePaymentsController(PaymentsService) {
        var vm = this;

        vm.balance = undefined;
        vm.rate = undefined;

        initialize();

        function initialize() {
            PaymentsService.getRate()
                .then(function(rate) {
                    vm.rate = rate;
                });
        }
    }

}());
