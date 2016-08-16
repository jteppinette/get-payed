(function() {
    'use strict';

    angular
        .module('dashboard.account')
        .factory('AccountService', AccountService);

    function AccountService($http, localStorageService) {
        return {
            update: update
        };

        function update(address, email, password) {
            return $http.post('api/account', {address: address, email: email, password: password})
                .then(function(http) {
                    var account = http.data;
                    localStorageService.set('token', account.token);
                    localStorageService.set('email', account.email);
                    localStorageService.set('address', account.address);
                    return account;
                });

        }
    }

}());
