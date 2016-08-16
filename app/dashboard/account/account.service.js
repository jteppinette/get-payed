(function() {
    'use strict';

    angular
        .module('dashboard.account')
        .factory('AccountService', AccountService);

    function AccountService($http, $q, localStorageService, toastr) {
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
                    toastr.success("Your account has been updated.", "Account Update Successful");
                    return account;
                })
                .catch(function(err) {
                    toastr.success(err.data.msg, "Account Update Failure");
                    return $q.reject(err);
                });

        }
    }

}());
