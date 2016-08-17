(function() {
    'use strict';

    angular
        .module('dashboard.common.address')
        .factory('AddressService', AddressService);

    function AddressService($http, $q, toastr) {
        return {
            history: history
        };

        function history(addressId) {
            if (!addressId) {
                toastr.error("A valid bitcoin address is required.", "Address History Failure");
                return $q.reject();
            }
            return $http.get('api/address/'+addressId+'/history')
                .then(function(http) {
                    return http.data.items;
                })
                .catch(function(err) {
                    toastr.error(err.data.msg, "Address History Failure");
                    return $q.reject(err);
                });
        }
    }

}());
