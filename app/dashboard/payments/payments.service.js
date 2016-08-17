(function() {
    'use strict';

    angular
        .module('dashboard.payments')
        .factory('PaymentsService', PaymentsService)

    function PaymentsService($rootScope, $http, $uibModal, $q, Constants, localStorageService, toastr) {
        initialize();
        return {
            create: create,
            list: list,
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

        function list() {
            return $http.get('api/history', {params: {address: localStorageService.get('address')}})
                .then(function(http) {
                    return http.data.items;
                })
                .catch(function(err) {
                    toastr.error(err.data.msg, "Payments History Failure");
                    return $q.reject(err);
                });
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
