(function() {
    'use strict';

    angular
        .module('auth.login')
        .controller('LoginController', LoginController);

    function LoginController($http) {
        var vm = this;

        vm.submit = submit;

        vm.credentials = {
            email: undefined,
            password: undefined
        };

        function submit(credentials) {
            return $http.post("api/auth/login", credentials);
        }
    }

}());
