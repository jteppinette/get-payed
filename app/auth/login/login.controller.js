(function() {
    'use strict';

    angular
        .module('auth.login')
        .controller('LoginController', LoginController);

    function LoginController($http, $state, localStorageService) {
        var vm = this;

        vm.submit = submit;

        vm.credentials = {
            email: undefined,
            password: undefined
        };
        vm.error = undefined;

        function submit(credentials) {
            return $http.post("api/auth/login", credentials)
                .then(function(http) {
                    localStorageService.set('token', http.data.token);
                    localStorageService.set('email', http.data.email);
                    $state.go('dashboard.overview');
                })
                .catch(function(err) {
                    vm.error = err.data;
                });
        }
    }

}());
