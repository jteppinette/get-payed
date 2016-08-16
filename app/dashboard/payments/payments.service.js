(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .factory('PaymentsService', PaymentsService);

    function PaymentsService($http, $uibModal) {
        return {
            create: create,
            getRate: getRate
        };

        function create() {
            return $uibModal.open({
                templateUrl: 'dashboard/payments/create/create.html',
                controller: 'CreatePaymentsController',
                controllerAs: 'create',
                size: 'md'
            }).result;
        }

        function getRate() {
            return $http.get('api/rate')
                .then(function(http) {
                    return http.data.rate;
                });
        }
    }

}());
