(function() {
    'use strict';

    angular
        .module('auth.register')
        .controller('RegisterController', RegisterController);

    function RegisterController($http) {
        var vm = this;

        vm.submit = submit;

        vm.credentials = {
            email: undefined,
            password: undefined
        };

        function submit(credentials) {
            return $http.post("api/auth/register", credentials);
        }
    }

}());
