(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .factory('PaymentsService', PaymentsService)

    function PaymentsService($rootScope, $http, $uibModal, localStorageService) {
        initialize();
        return {
            create: create,
            list: list,
            getRate: getRate
        };

        function initialize() {
            var bitcore = require('bitcore-lib');
            var socket = io('http://localhost:3001');
            socket.on('bitcoind/addresstxid', function(data) {
                var address = bitcore.Address(data.address);
                console.log("NEW TRANSACTION");
                if (address.toString() == localStorageService.get('address')) {
                    console.log("REFRESH PAYMENTS");
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

        function list() {
            return $http.get('api/history', {params: {address: localStorageService.get('address')}})
                .then(function(http) {
                    return http.data.items;
                });
        }

        function getRate() {
            return $http.get('api/rate')
                .then(function(http) {
                    return http.data.rate;
                });
        }
    }

}());
