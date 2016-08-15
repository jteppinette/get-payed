(function() {
    'use strict';

    angular
        .module('dashboard.payments.create')
        .controller('CreatePaymentsController', CreatePaymentsController);

    function CreatePaymentsController($http) {
        var vm = this;

        vm.balance = undefined;
        vm.rate = undefined;

        initialize();

        function initialize() {
            $http.get('api/rate')
                .then(function(http) {
                    vm.rate = http.data.rate;
                });
        }
    }

}());
