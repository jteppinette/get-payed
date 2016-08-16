(function() {
    'use strict';

    angular
        .module('auth')
        .factory('AuthService', AuthService);

    function AuthService($http, $state, localStorageService) {
        return {
            login: login,
            register: register
        };

        function login(email, password) {
            return $http.post("api/auth/login", {email: email, password: password})
                .then(success);
        }

        function register(email, password) {
            return $http.post("api/auth/register", {email: email, password: password})
                .then(success);
        }

        function success(http) {
            localStorageService.set('address', http.data.address);
            localStorageService.set('email', http.data.email);
            localStorageService.set('token', http.data.token);
            return $state.go('dashboard.overview');
        }
    }

}());
