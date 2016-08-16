(function() {
    'use strict';

    angular
        .module('dashboard.payments.create')
        .controller('CreatePaymentsController', CreatePaymentsController);

    function CreatePaymentsController($scope, $uibModalInstance, PaymentsService, localStorageService, toastr) {
        var vm = this;

        vm.balance = undefined;
        vm.rate = undefined;
        vm.address = undefined;

        initialize();

        function initialize() {
            vm.address = localStorageService.get('address');
            $scope.$on('payments:refresh', function() {
                $uibModalInstance.close();
                toastr.success("You have received a payment.", "Payment Received");
            });
            PaymentsService.getRate()
                .then(function(rate) {
                    vm.rate = rate;
                });
        }
    }

}());
