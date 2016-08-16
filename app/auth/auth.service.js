(function() {
    'use strict';

    angular
        .module('auth')
        .factory('AuthService', AuthService);

    function AuthService($http, $state, $q, localStorageService, toastr) {
        return {
            login: login,
            register: register
        };

        function login(email, password) {
            return $http.post("api/auth/login", {email: email, password: password})
                .then(success)
                .then(function() {
                    return toastr.success("Welcome back " + email + " .", "Login Successful");
                })
                .catch(function(err) {
                    toastr.error(err.data.msg, "Login Failure");
                    return $q.reject(err);
                });
        }

        function register(email, password) {
            return $http.post("api/auth/register", {email: email, password: password})
                .then(success)
                .then(function() {
                    return toastr.success("Thanks for registering " + email + " .", "Registration Successful");
                })
                .catch(function(err) {
                    toastr.error(err.data.msg, "Registration Failure");
                    return $q.reject(err);
                });


        }

        function success(http) {
            localStorageService.set('address', http.data.address);
            localStorageService.set('email', http.data.email);
            localStorageService.set('token', http.data.token);
            return $state.go('dashboard.overview');
        }
    }

}());
