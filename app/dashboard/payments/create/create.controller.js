(function() {
    'use strict';

    angular
        .module('dashboard.payments.create')
        .controller('CreatePaymentsController', CreatePaymentsController);

    function CreatePaymentsController(PaymentsService, localStorageService) {
        var vm = this;

        vm.balance = undefined;
        vm.rate = undefined;
        vm.address = undefined;

        initialize();

        function initialize() {
            vm.address = localStorageService.get('address');
            PaymentsService.getRate()
                .then(function(rate) {
                    vm.rate = rate;
                });
        }
    }

}());
