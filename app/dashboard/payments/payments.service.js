(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .factory('PaymentsService', PaymentsService)

    function PaymentsService($rootScope, $http, $uibModal, $q, Constants, localStorageService, toastr) {
        initialize();
        return {
            create: create,
            getRate: getRate
        };

        function initialize() {
            var bitcore = require('bitcore-lib');
            var socket = io(Constants.NODE_URL);
            socket.on('bitcoind/addresstxid', function(data) {
                var address = bitcore.Address(data.address);
                if (address.toString() == localStorageService.get('address')) {
                    $rootScope.$broadcast('payments:refresh');
                }
            });
            socket.emit('subscribe', 'bitcoind/addresstxid', [localStorageService.get('address')]);
        }

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
                })
                .catch(function(err) {
                    toastr.error(err.data.msg, "Rate Retrieval Failure");
                    return $q.reject(err);
                });
        }
    }

}());
