(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .controller('PaymentsController', PaymentsController);

    function PaymentsController() {
        var vm = this;

        vm.payments = [];

        initialize();

        function initialize() {
            vm.payments = [{id: 5}];
        }
    }

}());
